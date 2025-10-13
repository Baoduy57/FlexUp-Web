import Link from "next/link"; // Quan trọng: Thêm import này
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dumbbell,
  Apple,
  TrendingUp,
  Users,
  BookOpen,
  Settings,
} from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: Dumbbell,
      label: "Bắt đầu tập",
      color: "from-emerald-400 to-green-600",
      href: "/workouts",
    },
    {
      icon: Apple,
      label: "Ghi nhận bữa ăn",
      color: "from-orange-400 to-red-500",
      href: "/nutrition",
    },
    {
      icon: TrendingUp,
      label: "Xem tiến độ",
      color: "from-blue-400 to-indigo-500",
      href: "/progress",
    },
    {
      icon: Users,
      label: "Cộng đồng",
      color: "from-pink-400 to-rose-500",
      href: "/community",
    },
    {
      icon: BookOpen,
      label: "Kiến thức",
      color: "from-yellow-400 to-amber-500",
      href: "/knowledge",
    },
    {
      icon: Settings,
      label: "Cài đặt",
      color: "from-gray-400 to-slate-500",
      href: "/settings",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          ⚡ Thao tác nhanh
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            // THAY ĐỔI Ở ĐÂY: Dùng Link thay cho div
            <Link
              key={index}
              href={action.href}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md text-white 
              bg-gradient-to-r ${action.color} transition-transform transform hover:scale-105 hover:shadow-lg`}
            >
              <action.icon className="h-7 w-7 mb-2" />
              <span className="text-sm font-medium text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
