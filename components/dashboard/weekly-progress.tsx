import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar } from "lucide-react";

export function WeeklyProgress() {
  const weekDays = [
    { day: "T2", completed: true, name: "Thứ 2" },
    { day: "T3", completed: true, name: "Thứ 3" },
    { day: "T4", completed: true, name: "Thứ 4" },
    { day: "T5", completed: false, name: "Thứ 5" },
    { day: "T6", completed: false, name: "Thứ 6" },
    { day: "T7", completed: false, name: "Thứ 7" },
    { day: "CN", completed: false, name: "Chủ nhật" },
  ];

  const completedDays = weekDays.filter((day) => day.completed).length;
  const progressPercentage = (completedDays / weekDays.length) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-t-lg" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Tiến độ tuần này
            </CardTitle>
            <CardDescription>Mục tiêu: 5 buổi tập</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+20%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress tổng */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Hoàn thành</span>
            <span>
              {completedDays}/7 ngày ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 rounded-full" />
        </div>

        {/* Lịch các ngày trong tuần */}
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold shadow-md transition-all ${
                  day.completed
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {day.day}
              </div>
              <p className="text-xs mt-1 text-muted-foreground">{day.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
