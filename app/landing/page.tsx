"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Star,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
              <Image
                src="/logo/logo3.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
              FlexUp
            </span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:scale-105 transition">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register">
              <Button className="hover:scale-105 transition shadow-md">
                Đăng ký ngay
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 drop-shadow-md">
              🎯 Ứng dụng fitness #1 tại Việt Nam
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
              Biến đổi hành trình{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                fitness
              </span>{" "}
              của bạn
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Theo dõi, tập luyện và chinh phục mục tiêu của bạn với ứng dụng
              fitness toàn diện nhất. Hơn 100,000 người dùng đã tin tưởng chọn
              chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto max-w-xs text-lg px-8 py-6 hover:scale-105 transition bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                >
                  Bắt đầu miễn phí
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto max-w-xs text-lg px-8 py-6 hover:scale-105 transition border-white text-black"
              >
                <Play className="mr-2 w-5 h-5" />
                Xem demo
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative max-w-full mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-2xl p-4 sm:p-8 shadow-2xl">
              <Image
                src="/thumnail.png"
                alt="FlexUp Dashboard"
                width={800}
                height={500}
                className="rounded-xl shadow-xl mx-auto w-full max-w-full h-auto"
                priority
              />
            </div>
          </motion.div>

          {/* Background glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          {/* Heading */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500  to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
              Tại sao chọn FlexUp?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Chúng tôi cung cấp{" "}
              <span className="font-semibold text-foreground">tất cả</span>{" "}
              những gì bạn cần để đạt được mục tiêu fitness của mình.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Target className="w-8 h-8 text-blue-500" />,
                title: "Kế hoạch cá nhân hóa",
                desc: "Chương trình tập luyện được thiết kế riêng cho mục tiêu và trình độ của bạn.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
                title: "Theo dõi tiến độ",
                desc: "Biểu đồ chi tiết và thống kê giúp bạn thấy rõ sự cải thiện từng ngày.",
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Cộng đồng hỗ trợ",
                desc: "Kết nối với hàng nghìn người dùng khác để động viên và chia sẻ kinh nghiệm.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <Card className="text-center p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl bg-white/80 backdrop-blur-sm border border-muted-foreground/10">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-green-400/20 to-cyan-400/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 drop-shadow-sm">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Người dùng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-muted-foreground">
              Hàng nghìn người đã thay đổi cuộc sống với FlexUp
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Ứng dụng tuyệt vời! Tôi đã giảm được 15kg trong 6 tháng nhờ các chương trình tập luyện và dinh dưỡng.",
                name: "Mai Anh",
                city: "Hà Nội",
                initial: "M",
                color:
                  "bg-gradient-to-tr from-green-400 to-cyan-500 text-white",
              },
              {
                text: "Giao diện đẹp, dễ sử dụng. Tính năng theo dõi tiến độ rất chi tiết, giúp tôi có động lực tập luyện.",
                name: "Tuấn Minh",
                city: "TP.HCM",
                initial: "T",
                color:
                  "bg-gradient-to-tr from-blue-400 to-indigo-500 text-white",
              },
              {
                text: "Cộng đồng rất tích cực và hỗ trợ. Tôi đã tìm được nhiều bạn cùng chí hướng để duy trì lối sống khỏe mạnh.",
                name: "Linh Chi",
                city: "Đà Nẵng",
                initial: "L",
                color:
                  "bg-gradient-to-tr from-purple-400 to-pink-500 text-white",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center mr-3 font-semibold shadow`}
                      >
                        {testimonial.initial}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.city}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình của bạn?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn người dùng đã thay đổi cuộc sống với
            FlexUp. Miễn phí 30 ngày đầu tiên!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="default"
                className="w-full sm:w-auto max-w-xs text-lg px-8 py-6 hover:scale-105 transition"
              >
                Đăng ký miễn phí
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto max-w-xs text-lg px-8 py-6 border-white text-white hover:text-blue-800 shadow-sm hover:shadow-md dark:hover:bg-blue-300 hover:scale-105 transition"
              >
                Đã có tài khoản? Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/40 border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo + Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ">
                  <Image
                    src="/logo/logo3.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  FlexUp
                </span>
              </div>
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                Ứng dụng fitness toàn diện giúp bạn đạt được mục tiêu sức khỏe
                và thể hình.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-foreground">
                Sản phẩm
              </h4>
              <ul className="space-y-2">
                {[
                  "Kế hoạch tập luyện",
                  "Theo dõi dinh dưỡng",
                  "Cộng đồng",
                  "Thư viện kiến thức",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-foreground">
                Hỗ trợ
              </h4>
              <ul className="space-y-2">
                {[
                  "Trung tâm trợ giúp",
                  "Liên hệ",
                  "Câu hỏi thường gặp",
                  "Báo cáo lỗi",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-4 text-foreground">
                Công ty
              </h4>
              <ul className="space-y-2">
                {[
                  "Về chúng tôi",
                  "Tuyển dụng",
                  "Điều khoản",
                  "Chính sách bảo mật",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t mt-10 pt-6 text-center">
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              &copy; 2025{" "}
              <span className="font-semibold text-foreground">FlexUp</span>. Tất
              cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
