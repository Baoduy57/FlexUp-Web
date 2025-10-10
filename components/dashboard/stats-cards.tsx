import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Target, Droplets, Clock } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Buổi tập tuần này",
      value: "3/5",
      sub: "+1 từ tuần trước",
      icon: Activity,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Calo đã đốt",
      value: "1,247",
      sub: "Mục tiêu: 1,500",
      icon: Target,
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Nước đã uống",
      value: "1.8L",
      sub: "Mục tiêu: 2.5L",
      icon: Droplets,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Thời gian tập",
      value: "45 phút",
      sub: "Hôm nay",
      icon: Clock,
      color: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg"
        >
          {/* Gradient background blur */}
          <div
            className={`absolute inset-0 opacity-20 bg-gradient-to-br ${stat.color}`}
          />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-700">
              {stat.title}
            </CardTitle>
            <div
              className={`p-2 rounded-full bg-gradient-to-br ${stat.color} text-white shadow-md`}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="text-3xl font-extrabold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
