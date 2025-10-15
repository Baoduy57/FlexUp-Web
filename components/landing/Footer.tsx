// /app/(landing)/components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
// 1. Import các icon thương hiệu từ react-icons/si
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

// Dữ liệu cho các cột link
const footerLinks = {
  product: [
    "Kế hoạch tập luyện",
    "Theo dõi dinh dưỡng",
    "Cộng đồng",
    "Thư viện kiến thức",
  ],
  support: [
    "Trung tâm trợ giúp",
    "Liên hệ",
    "Câu hỏi thường gặp",
    "Báo cáo lỗi",
  ],
  company: ["Về chúng tôi", "Tuyển dụng", "Điều khoản", "Chính sách bảo mật"],
};

// 2. Cập nhật mảng socialLinks để sử dụng icon mới
const socialLinks = [
  { name: "Facebook", icon: <SiFacebook className="h-5 w-5" />, href: "#" },
  { name: "Twitter", icon: <FaTwitter className="h-5 w-5" />, href: "#" },
  { name: "Instagram", icon: <SiInstagram className="h-5 w-5" />, href: "#" },
  { name: "Linkedin", icon: <SiLinkedin className="h-5 w-5" />, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-background py-16 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
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
            <p className="text-muted-foreground max-w-xs leading-relaxed mb-6">
              Ứng dụng fitness toàn diện giúp bạn đạt được mục tiêu sức khỏe và
              thể hình.
            </p>

            <h4 className="font-semibold text-lg mb-3">
              Cập nhật thông tin mới nhất
            </h4>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
              <Button
                type="submit"
                size="icon"
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-600"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">
              Sản phẩm
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">
              Hỗ trợ
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">
              Công ty
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} FlexUp. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.href} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={social.name}
                  className="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  {social.icon}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
