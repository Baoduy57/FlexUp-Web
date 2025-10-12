"use client";

import { ReactNode, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface PremiumFeatureGateProps {
  featureName: string;
  children: ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export function PremiumFeatureGate({
  featureName,
  children,
  fallbackTitle = "Tính năng Premium",
  fallbackDescription = "Nâng cấp lên Premium để sử dụng tính năng này",
}: PremiumFeatureGateProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAccess();
  }, [accessToken, featureName]);

  const checkAccess = async () => {
    if (!accessToken) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/Subscription/check-access/${featureName}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setHasAccess(result.data.hasAccess);
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      console.error("Failed to check feature access:", error);
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  // Paywall UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-2 border-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {fallbackTitle}
            </CardTitle>
            <CardDescription className="text-lg">
              {fallbackDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Premium Benefits */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Lợi ích của gói Premium:
              </h3>
              <ul className="space-y-3">
                {[
                  "Tạo bài tập tùy chỉnh không giới hạn",
                  "Truy cập Cộng đồng & chia sẻ kinh nghiệm",
                  "Thống kê nâng cao & phân tích chi tiết",
                  "Kế hoạch tập luyện cá nhân hóa",
                  "Không quảng cáo",
                  "Hỗ trợ ưu tiên 24/7"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="text-center py-6 border-t border-b">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                50,000 ₫
              </div>
              <p className="text-muted-foreground mt-1">mỗi tháng</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold opacity-50 cursor-not-allowed"
                disabled
              >
                <Crown className="mr-2 h-5 w-5" />
                Nâng cấp lên Premium (Đang phát triển)
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Quay lại
              </Button>
            </div>

            {/* User info */}
            {user && (
              <p className="text-center text-xs text-muted-foreground">
                Đăng nhập với: {user.email}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
