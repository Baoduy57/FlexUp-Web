"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Home } from "lucide-react";

export default function PayOSCancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("orderCode");

  useEffect(() => {
    router.prefetch("/settings?tab=subscription");
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-semibold">Thanh toán đã bị hủy</CardTitle>
          <CardDescription>
            Bạn đã hủy quá trình thanh toán PayOS. Không có khoản phí nào được ghi nhận cho giao dịch này.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border bg-muted px-4 py-3 text-sm">
            <span className="font-medium">Mã đơn PayOS:</span>{" "}
            <span className="font-mono">{orderCode ?? "Không xác định"}</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Nếu bạn muốn tiếp tục nâng cấp lên gói Premium, hãy quay lại trang cài đặt và tạo giao dịch mới.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <Button variant="outline" onClick={() => router.push("/settings?tab=subscription")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại cài đặt
          </Button>
          <Button onClick={() => router.push("/dashboard")}>
            <Home className="mr-2 h-4 w-4" />
            Về trang chủ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
