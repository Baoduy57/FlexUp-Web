import { API_BASE_URL } from "./config";
import { ApiClient } from "./api-client";

export class AdminDashboardForbiddenError extends Error {
  constructor(message = "Bạn không có quyền truy cập thống kê quản trị.") {
    super(message);
    this.name = "AdminDashboardForbiddenError";
  }
}

export interface MonthlyMetric {
  key: string;
  label: string;
  count: number;
}

export interface AdminOverview {
  totalUsers: number;
  activeSubscribers: number;
  totalActiveSubscriptions: number;
  monthlyUserRegistrations: MonthlyMetric[];
  monthlyActiveSubscriptions: MonthlyMetric[];
}

interface AdminOverviewPayload {
  message: string;
  data: unknown;
}

export async function fetchAdminOverview(): Promise<AdminOverview> {
  const response = await ApiClient.get(
    `${API_BASE_URL}/api/admin/dashboard/overview`
  );

  if (response.status === 403) {
    throw new AdminDashboardForbiddenError();
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Không thể tải dữ liệu thống kê.");
  }

  const payload = (await response.json()) as AdminOverviewPayload;
  const raw = payload.data as unknown as {
    totalUsers?: number;
    TotalUsers?: number;
    activeSubscribers?: number;
    ActiveSubscribers?: number;
    totalActiveSubscriptions?: number;
    TotalActiveSubscriptions?: number;
    monthlyUserRegistrations?: Array<{
      key?: string;
      Key?: string;
      label?: string;
      Label?: string;
      count?: number;
      Count?: number;
    }>;
    monthlyActiveSubscriptions?: Array<{
      key?: string;
      Key?: string;
      label?: string;
      Label?: string;
      count?: number;
      Count?: number;
    }>;
  };

  const mapMonthly = (
    source:
      | Array<{ key?: string; Key?: string; label?: string; Label?: string; count?: number; Count?: number }>
      | undefined
  ): MonthlyMetric[] =>
    (source ?? []).map((item) => ({
      key: item.key ?? item.Key ?? "",
      label: item.label ?? item.Label ?? "",
      count: item.count ?? item.Count ?? 0,
    }));

  return {
    totalUsers: raw.totalUsers ?? raw.TotalUsers ?? 0,
    activeSubscribers: raw.activeSubscribers ?? raw.ActiveSubscribers ?? 0,
    totalActiveSubscriptions:
      raw.totalActiveSubscriptions ?? raw.TotalActiveSubscriptions ?? 0,
    monthlyUserRegistrations: mapMonthly(raw.monthlyUserRegistrations),
    monthlyActiveSubscriptions: mapMonthly(raw.monthlyActiveSubscriptions),
  };
}
