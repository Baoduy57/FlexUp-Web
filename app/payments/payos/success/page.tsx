"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, RefreshCcw, ArrowLeft, XCircle } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

type PaymentStatus = "checking" | "paid" | "pending" | "failed" | "unauthorized";

export default function PayOSSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { accessToken } = useAuth();
  const { toast } = useToast();

  const orderCode = searchParams.get("orderCode");

  const [status, setStatus] = useState<PaymentStatus>("checking");
  const [message, setMessage] = useState("Đang kiểm tra trạng thái thanh toán của bạn...");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const icon = useMemo(() => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-12 w-12 text-green-500" />;
      case "pending":
      case "checking":
        return <Clock className="h-12 w-12 text-blue-500" />;
      default:
        return <XCircle className="h-12 w-12 text-red-500" />;
    }
  }, [status]);

  const removePendingOrder = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("flexup_pending_order");
    }
  };

  const checkPaymentStatus = useCallback(
    async (manual = false) => {
      if (!orderCode) {
        setStatus("failed");
        setMessage("Không tìm thấy mã đơn thanh toán.");
        return;
      }

      if (!accessToken) {
        setStatus("unauthorized");
        setMessage("Vui lòng đăng nhập lại để kiểm tra trạng thái thanh toán.");
        return;
      }

      if (manual) {
        setIsRefreshing(true);
      } else {
        setStatus("checking");
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/Subscription/payment-status/${orderCode}?refresh=${manual ? "true" : "false"}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const result = await response.json();
        const data = result?.data;

        if (!data) {
          throw new Error("Không tìm thấy thông tin thanh toán.");
        }

        if (data.status === "PAID") {
          setStatus("paid");
          setMessage(data.message ?? "Thanh toán thành công! Gói Premium đã được kích hoạt.");
          removePendingOrder();
          toast({
            title: "Thanh toán thành công! 🎉",
            description: "Bạn có thể quay lại trang cài đặt để xem quyền lợi Premium.",
          });
          return;
        }

        if (data.status === "PENDING") {
          setStatus("pending");
          setMessage(data.message ?? "Thanh toán đang được xử lý. Vui lòng chờ trong giây lát hoặc thử kiểm tra lại.");
          if (manual) {
            toast({
              title: "Thanh toán đang xử lý",
              description: "Chúng tôi sẽ tự động cập nhật ngay khi PayOS xác nhận giao dịch.",
            });
          }
          return;
        }

        setStatus("failed");
        setMessage(data.message ?? "Thanh toán chưa được ghi nhận. Vui lòng thử lại hoặc liên hệ hỗ trợ.");
        removePendingOrder();
        toast({
          title: "Thanh toán chưa hoàn tất",
          description: data.message ?? "Bạn có thể thử tạo lại giao dịch mới.",
          variant: "destructive",
        });
      } catch (error) {
        console.error("Failed to verify PayOS payment:", error);
        setStatus("failed");
        setMessage("Không thể kiểm tra trạng thái thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.");
        if (manual) {
          toast({
            title: "Không thể kiểm tra thanh toán",
            description: "Vui lòng thử lại sau vài phút.",
            variant: "destructive",
          });
        }
      } finally {
        setIsRefreshing(false);
      }
    },
    [orderCode, accessToken, toast]
  );

  useEffect(() => {
    router.prefetch("/settings?tab=subscription");
  }, [router]);

  useEffect(() => {
    void checkPaymentStatus();
  }, [checkPaymentStatus]);

  const handleBackToSettings = () => {
    router.push("/settings?tab=subscription");
  };

  const handleRetry = () => {
    void checkPaymentStatus(true);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">{icon}</div>
          <CardTitle className="text-2xl font-semibold">
            {status === "paid"
              ? "Thanh toán thành công"
              : status === "pending"
              ? "Đang chờ xác nhận từ PayOS"
              : status === "unauthorized"
              ? "Cần đăng nhập"
              : "Không thể xác nhận thanh toán"}
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border bg-muted px-4 py-3 text-sm">
            <span className="font-medium">Mã đơn PayOS:</span>{" "}
            <span className="font-mono">{orderCode ?? "Không xác định"}</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Nếu bạn đã hoàn tất chuyển khoản, trạng thái sẽ được cập nhật tự động. Bạn có thể kiểm tra lại sau vài phút.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Button variant="outline" onClick={handleBackToSettings}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại cài đặt
          </Button>
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
            <Button
              variant="outline"
              onClick={handleRetry}
              disabled={isRefreshing || status === "paid" || status === "unauthorized"}
            >
              {isRefreshing ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Đang kiểm tra...
                </>
              ) : (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Kiểm tra lại
                </>
              )}
            </Button>
            <Button onClick={() => router.push("/dashboard")} disabled={status === "checking"}>
              Đi tới Dashboard
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
