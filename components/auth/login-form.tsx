"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const socialProviders = [
  {
    provider: "Google",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
        <path
          fill="#4285F4"
          d="M533.5 278.4c0-17.8-1.5-35-4.5-51.8H272v98h146.9c-6.3 33.8-25 62.5-53.5 81.9v68h86.5c50.5-46.5 79.6-115 79.6-196.1z"
        />
        <path
          fill="#34A853"
          d="M272 544.3c72.6 0 133.7-24 178.3-65.2l-86.5-68c-24.1 16.1-55 25.6-91.8 25.6-70.7 0-130.6-47.7-152-111.5h-89.9v69.9c44.6 88.6 135.2 149.2 241.9 149.2z"
        />
        <path
          fill="#FBBC05"
          d="M120 320.2c-10.1-30.6-10.1-63.4 0-94h-89.9v-69.9c-38.2 75.5-38.2 162.5 0 238l89.9-74.1z"
        />
        <path
          fill="#EA4335"
          d="M272 107.9c39.5 0 75.1 13.6 103.2 40.3l77.4-77.4C405.7 24.8 344.6 0 272 0 165.3 0 74.6 60.6 30 149.2l89.9 69.9c21.4-63.8 81.3-111.2 152-111.2z"
        />
      </svg>
    ),
  },
  {
    provider: "Facebook",
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 320 512">
        <path
          fill="#1877F2"
          d="M279.14 288l14.22-92.66h-88.91V127.16c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.36 0 225.36 0c-73.22 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z"
        />
      </svg>
    ),
  },
];

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn trở lại.",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description:
          error instanceof Error ? error.message : "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Đăng nhập với ${provider}`,
      description: "Tính năng sẽ được cập nhật sớm.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
      {/* Cột Trái: Hình ảnh */}
      <div className="hidden lg:block relative">
        <Image
          src="https://www.themuralstory.com/cdn/shop/files/Name_3_7a12c36c-b182-4fd9-8e04-3ccaedb21841.jpg?v=1742196033&width=1500"
          alt="Người phụ nữ đang tập yoga"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-8 flex flex-col justify-end">
          <motion.h2
            className="text-white text-3xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bắt đầu hành trình. <br /> Khám phá sức mạnh của bạn.
          </motion.h2>
        </div>
      </div>

      {/* Cột Phải: Form */}
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Chào mừng trở lại!
            </h1>
            <p className="text-muted-foreground">
              Đăng nhập để tiếp tục hành trình của bạn.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            {socialProviders.map((social) => (
              <Button
                key={social.provider}
                variant="outline"
                size="lg"
                className="w-full flex items-center justify-center gap-3 rounded-full"
                onClick={() => handleSocialLogin(social.provider)}
              >
                {social.svg}
                <span>Tiếp tục với {social.provider}</span>
              </Button>
            ))}
          </div>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="px-3 text-xs text-muted-foreground bg-background">
              HOẶC
            </span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-baseline">
                <Label htmlFor="password">Mật khẩu</Label>
              </div>

              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <Button
              className="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Đăng nhập
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-500 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
