"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="py-15 px-4 bg-background">
      <div className="container mx-auto">
        {/* 1. "Card" chứa toàn bộ nội dung CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400/50 via-background to-background border border-border p-8 md:p-12">
          {/* Lớp phủ hoa văn (tùy chọn, tạo chiều sâu) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(to right, #4f4f4f20 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f20 1px, transparent 1px)",
              backgroundSize: "2rem 2rem",
            }}
          />

          {/* Lớp glow trang trí */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            {/* 2. Cột Trái: Văn bản và Nút CTA */}
            <motion.div
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Bắt đầu hành trình chuyển đổi của bạn ngay hôm nay
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                Tham gia cùng hơn 100,000 người dùng đã thay đổi cuộc sống với
                FlexUp. Chỉ cần một cú nhấp chuột để bắt đầu phiên bản tốt hơn
                của chính bạn.
              </p>
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg transition-transform hover:scale-105"
                >
                  Dùng thử miễn phí
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* 3. Cột Phải: Hình ảnh sản phẩm */}
            <motion.div
              className="md:w-1/2 flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/placeholder-phone3.jpg" // Thay thế bằng ảnh của bạn
                alt="FlexUp App on Phone"
                width={300}
                height={600}
                className="transform -rotate-6 shadow-2xl rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
