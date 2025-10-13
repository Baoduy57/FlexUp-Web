"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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

  const socialProviders = [
    {
      provider: "Google",
      svg: (
        <svg className="w-6 h-6" viewBox="0 0 533.5 544.3">
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
        <svg className="w-6 h-6" viewBox="0 0 320 512">
          <path
            fill="#1877F2"
            d="M279.14 288l14.22-92.66h-88.91V127.16c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.36 0 225.36 0c-73.22 0-121.09 44.38-121.09 124.72v70.62H22.89V288h81.38v224h100.2V288z"
          />
        </svg>
      ),
    },
    {
      provider: "Apple",
      svg: (
        <svg className="w-6 h-6" viewBox="0 0 305 512">
          <path
            fill="#000000"
            d="M305 383c-3-56-46-83-96-83-46 0-61 30-114 30-51 0-71-31-113-31-58 0-104 47-104 123 0 67 44 144 98 144 45 0 62-30 114-30 52 0 69 30 113 30 54 0 97-78 97-143zM205 64c-18 22-44 36-70 36-4-22 6-45 18-61 14-19 40-31 64-31 4 22-6 46-12 56z"
          />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-md mx-auto rounded-2xl shadow-xl border border-gray-200 bg-white">
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md">
            Đăng nhập
          </CardTitle>
          <CardDescription className="text-gray-500">
            Chào mừng trở lại! Hãy đăng nhập để tiếp tục hành trình fitness
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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

            {/* Password */}
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xl md:text-sm font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                className="w-full py-3 rounded-xl from-blue-600 hover:from-blue-700 text-white font-semibold shadow-md"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-2 text-xs text-gray-400">
                Hoặc tiếp tục với
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Social login */}
            <div className="grid grid-cols-3 gap-3">
              {socialProviders.map((social, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="lg"
                  className="flex justify-center items-center rounded-xl shadow-sm hover:bg-gray-100"
                  onClick={() => handleSocialLogin(social.provider)}
                >
                  {social.svg}
                </Button>
              ))}
            </div>
          </CardContent>
        </form>

        <CardFooter className="py-4">
          <p className="text-center text-sm text-gray-500 w-full">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-xl md:text-sm font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md"
            >
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
