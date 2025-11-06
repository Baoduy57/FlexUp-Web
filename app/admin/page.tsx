"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Activity,
  BarChart3,
  Crown,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";
import {
  AdminDashboardForbiddenError,
  type AdminOverview,
  fetchAdminOverview,
} from "@/lib/admin-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ChartDatum = {
  key: string;
  label: string;
  registrations: number;
  subscribers: number;
};

const numberFormatter = new Intl.NumberFormat("vi-VN");

export default function AdminDashboardPage() {
  const router = useRouter();
  const { accessToken, isLoading: authLoading } = useAuth();

  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setForbidden(false);
      const data = await fetchAdminOverview();
      setOverview(data);
    } catch (err) {
      if (err instanceof AdminDashboardForbiddenError) {
        setForbidden(true);
        setOverview(null);
        return;
      }

      console.error("Failed to load admin overview:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải dữ liệu thống kê."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !accessToken && !forbidden) {
      router.push("/login");
    }
  }, [accessToken, authLoading, forbidden, router]);

  useEffect(() => {
    if (authLoading) return;
    if (!accessToken) return;
    void loadOverview();
  }, [accessToken, authLoading, loadOverview]);

  const conversionRate = useMemo(() => {
    if (!overview || overview.totalUsers === 0) return 0;
    return (overview.activeSubscribers / overview.totalUsers) * 100;
  }, [overview]);

  const chartData = useMemo<ChartDatum[]>(() => {
    if (!overview) return [];

    const merged = new Map<
      string,
      { label: string; registrations: number; subscribers: number }
    >();

    overview.monthlyUserRegistrations.forEach((item) => {
      merged.set(item.key, {
        label: item.label,
        registrations: item.count,
        subscribers: 0,
      });
    });

    overview.monthlyActiveSubscriptions.forEach((item) => {
      const existing = merged.get(item.key);
      if (existing) {
        existing.subscribers = item.count;
      } else {
        merged.set(item.key, {
          label: item.label,
          registrations: 0,
          subscribers: item.count,
        });
      }
    });

    return Array.from(merged.entries())
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => ({
        key,
        label: value.label,
        registrations: value.registrations,
        subscribers: value.subscribers,
      }));
  }, [overview]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-100/60 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-cyan-100/50 to-transparent blur-2xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/60 backdrop-blur-sm md:flex md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              <Sparkles className="size-4" />
              <span>FlexUp Admin Intelligence</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Tổng quan hiệu suất hệ thống
            </h1>
            <p className="text-base text-slate-600">
              Nắm bắt số lượng người dùng và chuyển đổi gói đăng ký theo thời gian thực để đưa ra quyết định nhanh chóng.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BarChart3 className="size-4 text-blue-500" />
              <span>Dữ liệu cập nhật liên tục khi người dùng đăng ký hoặc gia hạn.</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => void loadOverview()}
            disabled={loading || forbidden}
            className="mt-6 inline-flex items-center gap-2 rounded-full border-slate-300 bg-white px-6 shadow-sm transition hover:shadow-md md:mt-0"
          >
            <RefreshCcw className="size-4" />
            Làm mới
          </Button>
        </header>

        {forbidden ? (
          <ForbiddenState />
        ) : error ? (
          <ErrorState message={error} onRetry={loadOverview} />
        ) : loading && !overview ? (
          <LoadingState />
        ) : (
          overview && (
            <div className="flex flex-col gap-10">
              <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <MetricCard
                  title="Tổng số người dùng"
                  value={numberFormatter.format(overview.totalUsers)}
                  description="Tính đến thời điểm hiện tại"
                  icon={Users}
                  accent="from-blue-100/90 to-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200/60"
                />
                <MetricCard
                  title="Người dùng đang đăng ký"
                  value={numberFormatter.format(overview.activeSubscribers)}
                  description="Đang có gói hợp lệ và hoạt động"
                  icon={Crown}
                  accent="from-amber-100/90 to-amber-50 text-amber-600 ring-1 ring-inset ring-amber-200/60"
                />
                <MetricCard
                  title="Tỷ lệ chuyển đổi"
                  value={`${conversionRate.toFixed(1)}%`}
                  description="Tỷ lệ người dùng có gói đăng ký"
                  icon={TrendingUp}
                  accent="from-emerald-100/90 to-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200/60"
                />
              </section>

              <Card className="border-slate-200 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur">
                <CardHeader>
                  <CardTitle>Xu hướng 6 tháng gần nhất</CardTitle>
                  <CardDescription>
                    So sánh lượt đăng ký tài khoản mới và lượt mua gói đăng ký.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-8">
                  <div className="h-[360px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="4 4"
                          stroke="rgba(148, 163, 184, 0.3)"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          stroke="#64748b"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          stroke="#64748b"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) =>
                            numberFormatter.format(value as number)
                          }
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderRadius: 12,
                            border: "1px solid rgba(148, 163, 184, 0.35)",
                            color: "#0f172a",
                          }}
                          formatter={(value: number) =>
                            numberFormatter.format(value)
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="registrations"
                          name="Đăng ký tài khoản"
                          stroke="#6366f1"
                          strokeWidth={2}
                          fill="url(#colorRegistrations)"
                        />
                        <Area
                          type="monotone"
                          dataKey="subscribers"
                          name="Gói đăng ký"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          fill="url(#colorSubscribers)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur">
                <CardHeader>
                  <CardTitle>Thông tin thêm</CardTitle>
                  <CardDescription>
                    Số lượng gói đang hoạt động bao gồm cả những người có nhiều giao dịch trong cùng kỳ.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DetailItem
                      icon={Activity}
                      label="Tổng số gói đang hiệu lực"
                      value={numberFormatter.format(
                        overview.totalActiveSubscriptions
                      )}
                      helper="Một người dùng có thể có nhiều gói (gia hạn) đang hoạt động."
                    />
                    <DetailItem
                      icon={Crown}
                      label="Người dùng đăng ký / tổng người dùng"
                      value={`${numberFormatter.format(
                        overview.activeSubscribers
                      )} / ${numberFormatter.format(overview.totalUsers)}`}
                      helper="Giúp bạn hình dung nhanh tỷ trọng người trả phí."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  description: string;
  icon: typeof Users;
  accent: string;
}) {
  return (
    <Card className="border-0 bg-white/90 shadow-lg shadow-slate-200/80 backdrop-blur">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
            Realtime
          </span>
          <CardTitle className="text-lg text-slate-900">{title}</CardTitle>
          <CardDescription className="text-slate-500">{description}</CardDescription>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br p-3 shadow-inner ${accent}`}>
          <Icon className="size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 p-3 text-slate-600 shadow-inner">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600">{helper}</p>
    </div>
  );
}

function ForbiddenState() {
  return (
    <div className="rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white p-8 text-amber-800 shadow-lg shadow-amber-100/50">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-amber-100 p-3 text-amber-600 shadow-inner">
          <ShieldAlert className="size-6" />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            Bạn chưa được cấp quyền truy cập trang quản trị.
          </h2>
          <p className="text-sm leading-6 text-amber-700">
            Vui lòng thêm email hoặc user ID của bạn vào cấu hình{" "}
            <code className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
              AdminDashboard:AllowedEmails
            </code>{" "}
            hoặc{" "}
            <code className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
              AdminDashboard:AllowedUserIds
            </code>{" "}
            trong file <span className="font-medium">appsettings</span> của API.
            Sau đó khởi động lại backend để áp dụng thay đổi.
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void | Promise<void>;
}) {
  return (
    <div className="rounded-3xl border border-rose-200/70 bg-gradient-to-br from-rose-50 to-white p-8 text-rose-800 shadow-lg shadow-rose-100/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Không thể tải dữ liệu</h2>
          <p className="mt-2 text-sm text-rose-700">{message}</p>
        </div>
        <Button variant="outline" onClick={() => void onRetry()}>
          <RefreshCcw className="size-4" />
          Thử lại
        </Button>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-36 rounded-3xl border border-slate-200/70 bg-white/80 shadow-lg shadow-slate-200/60 backdrop-blur"
          >
            <div className="h-full animate-pulse rounded-3xl bg-slate-100/70" />
          </div>
        ))}
      </div>
      <div className="h-[360px] rounded-3xl border border-slate-200/70 bg-white/80 shadow-lg shadow-slate-200/60 backdrop-blur">
        <div className="h-full animate-pulse rounded-3xl bg-slate-100/70" />
      </div>
      <div className="h-48 rounded-3xl border border-slate-200/70 bg-white/80 shadow-lg shadow-slate-200/60 backdrop-blur">
        <div className="h-full animate-pulse rounded-3xl bg-slate-100/70" />
      </div>
    </div>
  );
}
