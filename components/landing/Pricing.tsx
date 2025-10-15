"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, X, User, Rocket, Building } from "lucide-react";
import { motion } from "framer-motion";

// 1. Tách các tính năng ra một danh sách tổng
const allFeatures = [
  "Kế hoạch tập luyện cơ bản",
  "Thư viện giới hạn 50 bài tập",
  "Hỗ trợ qua cộng đồng",
  "Lộ trình AI cá nhân hóa",
  "Không giới hạn bài tập",
  "Thống kê tiến độ chi tiết",
  "Tích hợp với thiết bị đeo",
  "Dành cho nhiều thành viên",
  "Bảng điều khiển cho Huấn luyện viên (PT)",
  "Hỗ trợ ưu tiên qua email & Zalo",
];

// 2. Cấu trúc lại dữ liệu để dễ so sánh
const pricingPlans = [
  {
    name: "Cá nhân",
    icon: <User className="w-8 h-8" />,
    priceMonthly: "0đ",
    priceYearly: "0đ",
    description: "Dành cho người mới bắt đầu muốn khám phá.",
    popular: false,
    buttonText: "Bắt đầu miễn phí",
    includedFeatures: new Set([
      "Kế hoạch tập luyện cơ bản",
      "Thư viện giới hạn 50 bài tập",
      "Hỗ trợ qua cộng đồng",
    ]),
  },
  {
    name: "Chuyên nghiệp",
    icon: <Rocket className="w-8 h-8" />,
    priceMonthly: "50.000đ",
    priceYearly: "1.999.000đ",
    description: "Giải phóng toàn bộ tiềm năng của bạn với AI.",
    popular: true,
    buttonText: "Nâng cấp ngay",
    includedFeatures: new Set([
      "Kế hoạch tập luyện cơ bản",
      "Thư viện giới hạn 50 bài tập",
      "Hỗ trợ qua cộng đồng",
      "Lộ trình AI cá nhân hóa",
      "Không giới hạn bài tập",
      "Thống kê tiến độ chi tiết",
      "Tích hợp với thiết bị đeo",
    ]),
  },
  {
    name: "Đội nhóm",
    icon: <Building className="w-8 h-8" />,
    priceMonthly: "500.000đ",
    priceYearly: "4.999.000đ",
    description: "Dành cho huấn luyện viên và các nhóm nhỏ.",
    popular: false,
    buttonText: "Liên hệ tư vấn",
    includedFeatures: new Set(allFeatures), // Gói này có tất cả
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-15 px-4 bg-background">
      <div className="container mx-auto">
        {/* Tiêu đề Section */}
        <motion.div
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-extrabold mb-4">
            Một mức giá cho mọi mục tiêu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chọn gói phù hợp nhất với hành trình fitness của bạn và bắt đầu ngay
            hôm nay.
          </p>
        </motion.div>

        {/* Nút gạt Tháng/Năm */}
        <div className="flex items-center justify-center space-x-4 mb-16">
          <span
            className={`font-medium transition-colors ${
              !isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Thanh toán theo tháng
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label="Toggle billing period"
          />
          <span
            className={`font-medium transition-colors relative ${
              isYearly ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Thanh toán theo năm
            <Badge
              variant="destructive"
              className="absolute -top-4 -right-12 text-xs animate-bounce"
            >
              Tiết kiệm 20%
            </Badge>
          </span>
        </div>

        {/* Bảng giá */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div
                className={`relative rounded-2xl h-full p-8 flex flex-col border
                  ${
                    plan.popular
                      ? "bg-gradient-to-b from-blue-500 to-cyan-500 text-white border-blue-500"
                      : "bg-muted/30 border-border"
                  }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white hover:bg-yellow-400">
                    Phổ biến nhất
                  </Badge>
                )}

                {/* Header Card */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`${
                      plan.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold ${
                      plan.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p
                  className={`mb-6 ${
                    plan.popular ? "text-blue-100" : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Giá tiền */}
                <div className="mb-8">
                  <span
                    className={`text-5xl font-extrabold ${
                      plan.popular ? "text-white" : "text-foreground"
                    }`}
                  >
                    {isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span
                    className={`ml-2 ${
                      plan.popular ? "text-blue-100" : "text-muted-foreground"
                    }`}
                  >
                    /{isYearly ? "năm" : "tháng"}
                  </span>
                </div>

                {/* Nút CTA */}
                <Button
                  size="lg"
                  className={`w-full text-lg mb-8 transition-transform hover:scale-105
                    ${
                      plan.popular
                        ? "bg-white text-white hover:bg-gray-100 font-bold"
                        : "bg-primary text-primary-foreground"
                    }`}
                >
                  {plan.buttonText}
                </Button>

                {/* Danh sách tính năng */}
                <ul className="space-y-4 flex-grow">
                  {allFeatures.map((feature) => {
                    const isIncluded = plan.includedFeatures.has(feature);
                    return (
                      <li key={feature} className="flex items-center">
                        {isIncluded ? (
                          <Check
                            className={`w-5 h-5 mr-3 flex-shrink-0 ${
                              plan.popular ? "text-white" : "text-green-500"
                            }`}
                          />
                        ) : (
                          <X
                            className={`w-5 h-5 mr-3 flex-shrink-0 ${
                              plan.popular
                                ? "text-blue-200/50"
                                : "text-muted-foreground/50"
                            }`}
                          />
                        )}
                        <span
                          className={`${
                            !isIncluded &&
                            (plan.popular
                              ? "text-blue-200/50 line-through"
                              : "text-muted-foreground/50 line-through")
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
    </section>
  );
}
