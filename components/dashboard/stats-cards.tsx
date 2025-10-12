import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Target, Droplets, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const trainingGoalLabels: Record<string, string> = {
  "muscle-gain": "Tăng cơ",
  "fat-loss": "Giảm mỡ",
  maintain: "Giữ dáng",
  endurance: "Tăng sức bền",
};

const calculateAgeLabel = (dateString?: string) => {
  if (!dateString) return "Chưa cập nhật";
  const dob = new Date(dateString);
  if (Number.isNaN(dob.getTime())) return "Chưa cập nhật";
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return Number.isNaN(age) ? "Chưa cập nhật" : `${age} tuổi`;
};

export function StatsCards() {
  const { user } = useAuth();

  const goalLabel =
    (user?.trainingGoal && trainingGoalLabels[user.trainingGoal]) ||
    (user?.trainingGoal ? user.trainingGoal : "Chưa cập nhật");

  const infoSource = user?.hasCompletedProfile
    ? "Thông tin từ hồ sơ"
    : "Cập nhật hồ sơ để cá nhân hóa";

  const stats = [
    {
      title: "Mục tiêu tập luyện",
      value: goalLabel,
      sub: infoSource,
      icon: Target,
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Cân nặng hiện tại",
      value: user?.weight ? `${user.weight} kg` : "Chưa cập nhật",
      sub: infoSource,
      icon: Activity,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Chiều cao",
      value: user?.height ? `${user.height} cm` : "Chưa cập nhật",
      sub: infoSource,
      icon: Droplets,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Độ tuổi ước tính",
      value: calculateAgeLabel(user?.dateOfBirth),
      sub: infoSource,
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
