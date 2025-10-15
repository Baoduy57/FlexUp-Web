"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Định nghĩa các mục điều hướng
const navItems = [
  { label: "Tính Năng", href: "#features" },
  { label: "Cách Hoạt Động", href: "#how-it-works" },
  { label: "Đánh Giá", href: "#testimonials" },
  { label: "Bảng Giá", href: "#pricing" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false); // State để theo dõi cuộn chuột
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State cho menu di động

  // Effect để xử lý cả active section và trạng thái cuộn
  useEffect(() => {
    const handleScroll = () => {
      // 1. Xử lý hiệu ứng khi cuộn
      setIsScrolled(window.scrollY > 10);

      // 2. Xử lý active section
      const sections = navItems.map((item) =>
        document.getElementById(item.href.substring(1))
      );
      const scrollPosition = window.scrollY + 100;

      let currentSection = "";
      for (const section of sections) {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          currentSection = section.id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Chạy 1 lần khi component mount

  return (
    // Thêm transition và thay đổi class dựa trên `isScrolled`
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b bg-background/95 shadow-sm"
          : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center space-x-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <Image
              src="/logo/logo3.png"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            FlexUp
          </span>
        </Link>

        {/* Navigation Links - Dành cho màn hình lớn */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item.label}
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  layoutId="underline"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Buttons - Dành cho màn hình lớn */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/login">
            <Button variant="ghost">Đăng nhập</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              Đăng ký ngay
            </Button>
          </Link>
        </div>

        {/* Nút Hamburger Menu - Dành cho di động */}
        <div className="md:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            aria-label="Open menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Menu Overlay - Dành cho di động */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="border-t">
              <nav className="flex flex-col items-center space-y-4 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(false)} // Tự động đóng menu khi click
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t w-full flex flex-col items-center gap-4">
                  <Link href="/login" className="w-full">
                    <Button variant="ghost" className="w-full text-lg">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Đăng ký ngay
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
