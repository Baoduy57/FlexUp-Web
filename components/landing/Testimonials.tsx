"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

// 1. Cập nhật dữ liệu: Thêm ảnh, tiêu đề, và độ dài text khác nhau
const testimonials = [
  {
    imageSrc: "https://i.pravatar.cc/100?img=1",
    title: "Một trải nghiệm thay đổi cuộc sống!",
    text: "Ứng dụng tuyệt vời! Tôi đã giảm được 15kg trong 6 tháng nhờ các chương trình tập luyện và dinh dưỡng cực kỳ khoa học. Lộ trình AI thực sự hiểu cơ thể tôi cần gì.",
    name: "Mai Anh",
    city: "Chuyên viên Marketing, Hà Nội",
  },
  {
    imageSrc: "https://i.pravatar.cc/100?img=2",
    title: "Giao diện đẹp và cực kỳ hữu ích",
    text: "Giao diện đẹp, dễ sử dụng. Tính năng theo dõi tiến độ rất chi tiết, nó thực sự là nguồn động lực lớn nhất giúp tôi đến phòng gym mỗi ngày.",
    name: "Tuấn Minh",
    city: "Lập trình viên, TP.HCM",
  },
  {
    imageSrc: "https://i.pravatar.cc/100?img=3",
    title: "Tìm thấy những người bạn tuyệt vời",
    text: "Cộng đồng rất tích cực và hỗ trợ. Tôi đã tìm được nhiều bạn cùng chí hướng để duy trì lối sống khỏe mạnh. Chúng tôi thường xuyên tạo thử thách và động viên nhau.",
    name: "Linh Chi",
    city: "Nhà thiết kế, Đà Nẵng",
  },
  {
    imageSrc: "https://i.pravatar.cc/100?img=4",
    title: "Vượt qua giới hạn của bản thân",
    text: "Tôi chưa bao giờ nghĩ mình có thể hoàn thành một chuỗi push-up. Nhờ các bài tập tăng dần của FlexUp, giờ tôi đã làm được! Cảm ơn app rất nhiều.",
    name: "Quốc Bảo",
    city: "Sinh viên, Cần Thơ",
  },
  {
    imageSrc: "https://i.pravatar.cc/100?img=5",
    title: "Đơn giản là ứng dụng tốt nhất",
    text: "Đã thử qua nhiều app fitness, nhưng đây là ứng dụng duy nhất tôi gắn bó lâu dài. Mọi thứ đều được cá nhân hóa một cách hoàn hảo.",
    name: "Thảo Vy",
    city: "Kinh doanh tự do, Hải Phòng",
  },
  {
    imageSrc: "https://i.pravatar.cc/100?img=6",
    title: "Kết quả nói lên tất cả!",
    text: "Số đo 3 vòng của tôi đã cải thiện đáng kể chỉ sau 3 tháng. Các bài tập tập trung vào từng nhóm cơ rất hiệu quả.",
    name: "Hồng Nhung",
    city: "Nhân viên văn phòng, Bình Dương",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-15 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Tiêu đề Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Hàng Ngàn Câu Chuyện Thành Công
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Xem cách FlexUp giúp người dùng trên khắp Việt Nam thay đổi cuộc
            sống.
          </p>
        </motion.div>

        {/* 2. Bố cục Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid" // Ngăn card bị ngắt qua các cột
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 rounded-2xl shadow-lg bg-background flex flex-col transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2">
                <Quote
                  className="w-10 h-10 text-blue-500/20 mb-4"
                  fill="currentColor"
                />

                <h3 className="font-bold text-xl mb-2 text-foreground">
                  {testimonial.title}
                </h3>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="flex items-center mt-auto border-t border-border pt-4">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
    </section>
  );
}
