"use client";

import { motion } from "framer-motion";
import { UserPlus, ClipboardList, Zap, BarChart } from "lucide-react";

// 1. Bổ sung bước 4 và thêm màu sắc cho icon
const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-blue-500" />,
    title: "Đăng ký tài khoản",
    description:
      "Tạo tài khoản miễn phí chỉ trong vài phút để bắt đầu hành trình của bạn.",
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-green-500" />,
    title: "Thiết lập mục tiêu",
    description:
      "Cung cấp thông tin về mục tiêu (giảm cân, tăng cơ,...) và thể trạng hiện tại của bạn.",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    title: "Bắt đầu tập luyện",
    description:
      "Nhận lộ trình cá nhân hóa từ AI và bắt đầu chinh phục các cột mốc đầu tiên.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-orange-500" />,
    title: "Theo dõi & Tối ưu hóa",
    description:
      "Trực quan hóa sự tiến bộ của bạn qua các biểu đồ chi tiết và nhận gợi ý từ AI để vượt qua mọi giới hạn.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-15 px-6 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto relative z-10">
        {/* Tiêu đề Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
            Hành trình của bạn, đơn giản hóa
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi biến việc đạt được mục tiêu sức khỏe trở nên dễ dàng hơn
            bao giờ hết.
          </p>
        </motion.div>

        {/* 2. Bố cục Dòng thời gian Dọc */}
        <div className="relative max-w-3xl mx-auto">
          {/* Đường kẻ dọc ở giữa (chỉ hiển thị trên desktop) */}
          <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-border -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative md:flex md:items-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Nội dung Bước */}
              <div
                className={`w-full md:w-1/2 p-6 rounded-xl bg-muted/40 shadow-lg border border-border
                  ${
                    index % 2 === 0
                      ? "md:pr-10 md:text-right"
                      : "md:pl-10 md:ml-auto md:text-left"
                  }`}
              >
                <div
                  className={`flex items-center gap-4 mb-3 ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  {/* Icon */}
                  {index % 2 !== 0 && (
                    <div className="flex-shrink-0 w-14 h-14 bg-background rounded-full flex items-center justify-center shadow-md">
                      {step.icon}
                    </div>
                  )}
                  {/* Tiêu đề */}
                  <h3 className="text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  {index % 2 === 0 && (
                    <div className="flex-shrink-0 w-14 h-14 bg-background rounded-full flex items-center justify-center shadow-md">
                      {step.icon}
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Số thứ tự và chấm tròn trên đường kẻ (desktop) */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-background shadow-md flex items-center justify-center font-bold text-white">
                  {index + 1}
                </div>
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
