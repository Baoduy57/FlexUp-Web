"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Dumbbell,
  Apple,
  TrendingUp,
  Users,
  BookOpen,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navigation = [
  { name: "Trang chủ", href: "/dashboard", icon: Home },
  { name: "Tập luyện", href: "/workouts", icon: Dumbbell },
  { name: "Dinh dưỡng", href: "/nutrition", icon: Apple },
  { name: "Tiến độ", href: "/progress", icon: TrendingUp },
  { name: "Cộng đồng", href: "/community", icon: Users },
  { name: "Kiến thức", href: "/knowledge", icon: BookOpen },
  { name: "Cài đặt", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden rounded-full bg-white/70 backdrop-blur-lg shadow-md hover:bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl transform transition-all duration-300 ease-in-out",
          // mobile overlay
          isOpen
            ? "translate-x-0 w-72 md:translate-x-0"
            : "-translate-x-full md:translate-x-0",
          // desktop collapsible
          collapsed ? "md:w-20" : "md:w-72"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo + toggle */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11  rounded-xl flex items-center justify-center shadow-md">
                {/* <Dumbbell className="h-5 w-5 text-white" /> */}
                <Image
                  src="/logo/logo3.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              {!collapsed && (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500  to-cyan-500 bg-clip-text text-transparent">
                  FlexUp
                </span>
              )}
            </div>
            {/* chỉ hiển thị toggle ở desktop */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-gray-400 hover:text-white"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 rounded-xl px-4 py-3 text-base transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="px-4 py-4 border-t border-white/10 bg-gradient-to-r from-gray-800/70 to-gray-900/70">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-blue-500">
                <AvatarImage src="/user-avatar.jpg" />
                <AvatarFallback>NV</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    Thái Bảo Duy
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    Cấp độ: Trung bình
                  </p>
                </div>
              )}
              {!collapsed && (
                <Settings
                  className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition"
                  onClick={() => router.push("/settings")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
