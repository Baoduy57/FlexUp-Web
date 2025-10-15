"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

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

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, handleRedirectAfterRegister } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Lỗi xác nhận mật khẩu",
        description: "Mật khẩu không khớp.",
        variant: "destructive",
      });
      return;
    }
    if (!acceptTerms) {
      toast({
        title: "Vui lòng đồng ý điều khoản",
        description:
          "Bạn cần đồng ý với điều khoản sử dụng và chính sách bảo mật.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await register(formData.email, formData.password);
      handleRedirectAfterRegister();
      toast({
        title: "Đăng ký thành công!",
        description: "Chào mừng bạn đến với FlexUp. Hãy đăng nhập để bắt đầu.",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description:
          error instanceof Error ? error.message : "Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Đăng ký với ${provider}`,
      description: "Tính năng sẽ được cập nhật sớm.",
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-background rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[650px]">
      {/* Cột Trái: Hình ảnh */}
      <div className="hidden lg:block relative">
        <Image
          src="https://i.etsystatic.com/47453606/r/il/148231/7049289337/il_570xN.7049289337_kv2j.jpg"
          alt="Người đàn ông đang tập luyện"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end">
          <motion.h2
            className="text-white text-3xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tham gia cộng đồng. <br /> Chinh phục mục tiêu của bạn.
          </motion.h2>
        </div>
      </div>

      <div className="p-8 md:p-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center lg:text-left mb-6">
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tạo tài khoản
            </h1>
            <p className="text-muted-foreground">
              Bắt đầu hành trình fitness của bạn chỉ trong vài phút.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-4">
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

          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1 mb-5">
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
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative mt-1 mb-5">
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
            </div>
            <div>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative mt-1 mb-5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none"
              >
                Tôi đồng ý với{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Điều khoản
                </Link>{" "}
                và{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Chính sách bảo mật
                </Link>
                .
              </Label>
            </div>

            <Button
              className="w-full h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-base"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Tạo tài khoản
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Đã có tài khoản?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-500 hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
