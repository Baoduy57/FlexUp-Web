"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
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

interface SubscriptionInfo {
  currentPlan: string;
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
        setSubscription(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    }
  }, [accessToken]);

  useEffect(() => {
    void fetchSubscription();
  }, [fetchSubscription]);

  const handleUpgrade = async () => {
    if (!accessToken) return;

    setIsUpgrading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Subscription/upgrade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          paymentMethod: "manual",
          amount: 50000,
          durationMonths: 1,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Nâng cấp thành công! 🎉",
          description: result.message,
        });
        setShowPaymentDialog(false);
        await fetchSubscription();
      } else {
        throw new Error("Upgrade failed");
      }
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
      toast({
        title: "Lỗi nâng cấp",
        description: "Không thể nâng cấp lên Premium. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  const isPremium = subscription?.currentPlan === "premium";

  return (
    <div className="space-y-8">
      {/* Current Status */}
      {subscription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                {isPremium ? <Crown className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                Gói {isPremium ? "Premium" : "Free"}
              </h3>
              {isPremium && subscription.daysRemaining !== undefined && (
                <p className="mt-2 text-white/90">
                  Còn lại: {subscription.daysRemaining} ngày
                </p>
              )}
            </div>
            {isPremium && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/40">
                Đang hoạt động
              </Badge>
            )}
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
              <div>
                <div className="text-3xl font-bold">50,000 ₫</div>
                <p className="text-sm text-muted-foreground">/tháng</p>
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
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Nâng cấp ngay (Đang phát triển)
                </Button>
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
              Bạn sẽ được nâng cấp lên gói Premium với giá 50,000 ₫/tháng
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
              Lưu ý: Đây là demo. Trong thực tế sẽ tích hợp các cổng thanh toán như MoMo, ZaloPay, VNPay.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleUpgrade}
              disabled={isUpgrading}
              className="bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              {isUpgrading ? "Đang xử lý..." : "Xác nhận nâng cấp"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
