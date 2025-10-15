"use client";

import { Bot, Dumbbell, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// 1. Cập nhật cấu trúc dữ liệu, thêm ảnh cho mỗi tính năng
const features = [
  {
    icon: <Bot className="w-10 h-10 text-blue-500" />,
    title: "Lộ trình AI cá nhân hóa",
    desc: "Trí tuệ nhân tạo của chúng tôi phân tích mục tiêu, thể trạng và sở thích của bạn để xây dựng một kế hoạch tập luyện và dinh dưỡng độc nhất, tối ưu cho riêng bạn.",
    imageSrc:
      "https://cdn.prod.website-files.com/61713dc07218ee71af5413af/65cb4d01e37ed272a2f402c5_Revolutionizing%20Fitness_%20How%20AI%20is%20Transforming%20Workout%20Regimens-min.jpg",
  },
  {
    icon: <Dumbbell className="w-10 h-10 text-green-500" />,
    title: "Thư viện bài tập khổng lồ",
    desc: "Khám phá hơn 100+ bài tập với video hướng dẫn 4K sắc nét, bao gồm mọi thể loại từ gym, yoga, cardio cho đến các bài tập không cần dụng cụ tại nhà.",
    imageSrc: "/thumnail.png",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-purple-500" />,
    title: "Theo dõi tiến độ trực quan",
    desc: "Biểu đồ chi tiết và các chỉ số dễ hiểu giúp bạn thấy rõ sự cải thiện về cân nặng, số đo, sức mạnh và sức bền qua từng ngày, tạo động lực mạnh mẽ.",
    imageSrc: "/progress.png",
  },
  {
    icon: <Users className="w-10 h-10 text-orange-500" />,
    title: "Cộng đồng hỗ trợ 24/7",
    desc: "Kết nối với hàng nghìn người dùng, tham gia các thử thách, chia sẻ thành tích và nhận được sự động viên từ những người bạn cùng chung mục tiêu.",
    imageSrc:
      "https://media.stylist.co.uk/app/uploads/2020/08/14122542/fitness-communities-empowering.jpg",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-15 px-6 bg-muted/30">
      <div className="container mx-auto">
        {/* Tiêu đề Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
            Tất Cả Trong Một Nền Tảng
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            FlexUp cung cấp mọi công cụ bạn cần để chinh phục mục tiêu sức khỏe,
            dù bạn là người mới bắt đầu hay vận động viên chuyên nghiệp.
          </p>
        </motion.div>

        {/* 2. Bố cục xen kẽ hình ảnh và văn bản */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                // Logic để xen kẽ: hàng chẵn ảnh bên trái, hàng lẻ ảnh bên phải
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* Cột hình ảnh */}
              <div className="md:w-1/2 w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={feature.imageSrc}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>

              {/* Cột văn bản */}
              <div className="md:w-1/2 w-full text-center md:text-left">
                <div className="inline-block p-4 bg-background rounded-2xl mb-5 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <Button variant="link" className="p-0 text-lg text-blue-500">
                  Tìm hiểu thêm
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
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
