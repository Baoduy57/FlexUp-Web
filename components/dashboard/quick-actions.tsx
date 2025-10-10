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
    },
    {
      icon: Apple,
      label: "Ghi nhận bữa ăn",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: TrendingUp,
      label: "Xem tiến độ",
      color: "from-blue-400 to-indigo-500",
    },
    { icon: Users, label: "Cộng đồng", color: "from-pink-400 to-rose-500" },
    {
      icon: BookOpen,
      label: "Kiến thức",
      color: "from-yellow-400 to-amber-500",
    },
    { icon: Settings, label: "Cài đặt", color: "from-gray-400 to-slate-500" },
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
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md text-white cursor-pointer 
              bg-gradient-to-r ${action.color} transition-transform transform hover:scale-105 hover:shadow-lg`}
            >
              <action.icon className="h-7 w-7 mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
