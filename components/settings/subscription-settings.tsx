"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, ExternalLink, Loader2, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SubscriptionPlan = "free" | "premium";
type SubscriptionStatus = "Active" | "PendingPayment" | "Cancelled" | "Expired" | "Unknown";

interface SubscriptionInfo {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  isActive: boolean;
  daysRemaining?: number;
  canAccessPremiumFeatures: boolean;
}

export function SubscriptionSettings() {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<{ orderCode: string; status: string; message: string } | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const { accessToken } = useAuth();
  const { toast } = useToast();

  const freeFeatures = [
    "Truy cập bài tập cơ bản",
    "Theo dõi tiến độ",
    "Lịch sử tập luyện",
    "Thống kê cơ bản"
  ];

  const premiumFeatures = [
    "Tất cả tính năng Free",
    "Tạo bài tập tùy chỉnh",
    "Truy cập Cộng đồng",
    "Thống kê nâng cao",
    "Kế hoạch cá nhân hóa",
    "Không quảng cáo"
  ];

  const fetchSubscription = useCallback(async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/Subscription/current`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const raw = result.data ?? {};

        const plan = (raw.subscriptionType ?? raw.currentPlan ?? "free").toString().toLowerCase() as SubscriptionPlan;
        const statusString = (raw.status ?? "Unknown").toString();
        const status = ["Active", "PendingPayment", "Cancelled", "Expired"].includes(statusString)
          ? (statusString as SubscriptionStatus)
          : "Unknown";

        const nextSubscription: SubscriptionInfo = {
          plan,
          status,
          subscriptionStartDate: raw.startDate ?? raw.subscriptionStartDate,
          subscriptionEndDate: raw.endDate ?? raw.subscriptionEndDate,
          isActive: raw.isActive ?? status === "Active",
          daysRemaining: raw.daysRemaining,
          canAccessPremiumFeatures: plan === "premium" && status === "Active",
        };

        setSubscription(nextSubscription);

        if (status === "PendingPayment" && raw.orderCode) {
          setPendingPayment({
            orderCode: raw.orderCode.toString(),
            status: "PENDING",
            message: "Thanh toán đang chờ PayOS xác nhận. Vui lòng kiểm tra lại sau ít phút.",
          });
        } else if (status !== "PendingPayment") {
          setPendingPayment(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("flexup_pending_order");
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    }
  }, [accessToken]);

  const checkPendingPayment = useCallback(async (orderCode: string, forceRefresh = false) => {
    if (!accessToken) return;

    setIsCheckingPayment(true);
    try {
      const refreshParam = forceRefresh ? "true" : "false";
      const response = await fetch(`${API_BASE_URL}/api/Subscription/payment-status/${orderCode}?refresh=${refreshParam}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404 && typeof window !== "undefined") {
          localStorage.removeItem("flexup_pending_order");
        }
        throw new Error("Unable to check payment status");
      }

      const result = await response.json();
      const data = result?.data;

      if (!data) {
        return;
      }

      if (data.status === "PAID") {
        if (typeof window !== "undefined") {
          localStorage.removeItem("flexup_pending_order");
        }
        setPendingPayment(null);
        toast({
          title: "Thanh toán thành công! 🎉",
          description: "Gói Premium sẽ được kích hoạt ngay.",
        });
        await fetchSubscription();
        return;
      }

      if (data.status === "PENDING") {
        setPendingPayment({
          orderCode,
          status: data.status,
          message: data.message ?? "Thanh toán đang được xử lý. Vui lòng chờ trong giây lát.",
        });
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("flexup_pending_order");
      }
      setPendingPayment(null);
      toast({
        title: "Thanh toán chưa hoàn tất",
        description: data.message ?? "Có vẻ giao dịch chưa được thực hiện.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Failed to check payment status:", error);
      toast({
        title: "Không thể kiểm tra thanh toán",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingPayment(false);
    }
  }, [accessToken, fetchSubscription, toast]);

  useEffect(() => {
    void fetchSubscription();
  }, [fetchSubscription]);

  useEffect(() => {
    if (!accessToken || typeof window === "undefined") return;
    const storedOrder = localStorage.getItem("flexup_pending_order");
    if (!storedOrder) return;

    void checkPendingPayment(storedOrder);
  }, [accessToken, checkPendingPayment]);

  const handleUpgrade = async () => {
    if (!accessToken) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập lại để tiếp tục nâng cấp.",
        variant: "destructive",
      });
      return;
    }

    setIsUpgrading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Subscription/upgrade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          subscriptionType: "premium",
          paymentMethod: "PayOS",
          autoRenew: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message ?? "Không thể tạo liên kết thanh toán.");
      }

      const paymentData = result?.data;
      const orderCode = paymentData?.orderCode ? String(paymentData.orderCode) : null;

      if (orderCode) {
        if (typeof window !== "undefined") {
          localStorage.setItem("flexup_pending_order", orderCode);
        }
        setPendingPayment({
          orderCode,
          status: paymentData?.paymentStatus ?? "PENDING",
          message: "Liên kết PayOS đã sẵn sàng. Vui lòng hoàn tất thanh toán.",
        });
      }

      if (paymentData?.paymentUrl) {
        toast({
          title: "Chuyển đến PayOS",
          description: "Bạn sẽ được chuyển tới PayOS để hoàn tất thanh toán.",
        });
        setShowPaymentDialog(false);
        if (typeof window !== "undefined") {
          window.location.href = paymentData.paymentUrl;
        }
        return;
      }

      toast({
        title: "Nâng cấp thành công! 🎉",
        description: result?.message ?? "Gói Premium đã được kích hoạt.",
      });
      setPendingPayment(null);
      setShowPaymentDialog(false);
      await fetchSubscription();
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
      toast({
        title: "Lỗi nâng cấp",
        description:
          error instanceof Error
            ? error.message
            : "Không thể nâng cấp lên Premium. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  const isPremium = subscription?.plan === "premium";
  const isPendingStatus = subscription?.status === "PendingPayment";
  const showUpgradeDisabled = isPremium || isPendingStatus || isUpgrading || isCheckingPayment;
  const planLabel = isPremium ? "Premium" : "Free";
  const statusLabel = subscription ? (() => {
    switch (subscription.status) {
      case "Active":
        return "Đang hoạt động";
      case "PendingPayment":
        return "Đang chờ thanh toán";
      case "Cancelled":
        return "Đã hủy";
      case "Expired":
        return "Đã hết hạn";
      default:
        return "Không xác định";
    }
  })() : "Chưa đăng ký";
  const isPaymentPending = Boolean(pendingPayment);
  const showDaysRemaining =
    isPremium &&
    typeof subscription?.daysRemaining === "number" &&
    subscription.daysRemaining >= 0 &&
    subscription.daysRemaining < 36500;

  return (
    <div className="space-y-8">
      {pendingPayment && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border border-blue-200 bg-blue-50/80 shadow-sm">
            <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  Đang chờ thanh toán
                </p>
                <p className="text-sm text-blue-800">
                  Mã đơn:{" "}
                  <span className="font-mono font-semibold">{pendingPayment.orderCode}</span>.{" "}
                  {pendingPayment.message}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void checkPendingPayment(pendingPayment.orderCode, true)}
                  disabled={isCheckingPayment}
                >
                  {isCheckingPayment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isCheckingPayment ? "Đang kiểm tra..." : "Kiểm tra lại"}
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(
                        `/payments/payos/success?orderCode=${pendingPayment.orderCode}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Hướng dẫn thanh toán
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Current Status */}
      {subscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 shadow-lg text-white ${isPremium ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-slate-800"}`}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isPremium ? <Crown className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                <h3 className="text-2xl font-bold">Gói {planLabel}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={
                      subscription.status === "PendingPayment"
                        ? "bg-yellow-400/90 text-slate-900 border-transparent"
                        : "bg-white/20 text-white border-white/40"
                    }
                  >
                    {statusLabel}
                  </Badge>
                  {subscription.canAccessPremiumFeatures ? "Quyền Premium đã mở khóa" : "Quyền Free"}
                </span>
                {subscription.subscriptionStartDate && (
                  <span>
                    Bắt đầu:{" "}
                    {new Date(subscription.subscriptionStartDate).toLocaleDateString("vi-VN")}
                  </span>
                )}
                {subscription.subscriptionEndDate && (
                  <span>
                    Hết hạn:{" "}
                    {new Date(subscription.subscriptionEndDate).toLocaleDateString("vi-VN")}
                  </span>
                )}
              </div>
              {showDaysRemaining && (
                <p className="text-sm text-white/90">
                  Còn lại: {subscription.daysRemaining} ngày
                </p>
              )}
              {isPendingStatus && (
                <p className="text-sm text-yellow-200">
                  Giao dịch đang được PayOS xác nhận. Bạn có thể kiểm tra lại hoặc xem hướng dẫn bên trên.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Free
              </CardTitle>
              <CardDescription>Miễn phí mãi mãi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">0 ₫</div>
              <ul className="space-y-2">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                disabled={!isPremium}
                variant="outline"
                className="w-full"
              >
                {isPremium ? "Gói hiện tại là Premium" : "Đang sử dụng"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-2 border-gradient-to-r from-blue-500 to-cyan-500 shadow-xl">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
              PHỔ BIẾN
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Premium
              </CardTitle>
              <CardDescription>Mở khóa toàn bộ tính năng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">50,000 ₫</span>
                <span className="text-sm text-muted-foreground">/tháng</span>
              </div>
              <ul className="space-y-2">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              {isPremium ? (
                <>
                  <Button disabled className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Crown className="mr-2 h-4 w-4" />
                    Đang sử dụng
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Hủy đăng ký (Đang phát triển)
                  </Button>
                </>
              ) : (
                <>
                  {(isPaymentPending || isPendingStatus) && (
                    <p className="text-sm text-muted-foreground text-center">
                      {pendingPayment?.message ?? "Đang chờ PayOS xác nhận thanh toán. Bạn sẽ được mở khóa Premium sau khi hoàn tất."}
                    </p>
                  )}
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    onClick={() => setShowPaymentDialog(true)}
                    disabled={showUpgradeDisabled}
                  >
                    {isUpgrading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {isUpgrading ? "Đang tạo liên kết..." : "Nâng cấp ngay"}
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Nâng cấp lên Premium
            </DialogTitle>
            <DialogDescription>
              Thanh toán an toàn qua PayOS. Sau khi xác nhận, bạn sẽ được chuyển đến PayOS để hoàn tất giao dịch.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Chi tiết thanh toán:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Gói Premium (1 tháng)</span>
                  <span className="font-medium">50,000 ₫</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Tổng cộng</span>
                  <span>50,000 ₫</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Hoàn tất thanh toán trên PayOS để kích hoạt gói Premium. Sau khi thanh toán thành công, hệ thống sẽ tự động cập nhật trạng thái gói của bạn.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} disabled={isUpgrading}>
              Hủy
            </Button>
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              {isUpgrading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang tạo liên kết...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Thanh toán với PayOS
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
