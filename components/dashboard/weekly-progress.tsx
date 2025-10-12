import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import { mapCategoryLabel } from "@/lib/workout-utils";

interface WorkoutSummary {
  id: number;
  name: string;
  category: string;
}

interface WorkoutsApiResponse {
  data?: WorkoutSummary[];
}

const baseWeekDays = [
  { code: "T2", label: "Thứ 2" },
  { code: "T3", label: "Thứ 3" },
  { code: "T4", label: "Thứ 4" },
  { code: "T5", label: "Thứ 5" },
  { code: "T6", label: "Thứ 6" },
  { code: "T7", label: "Thứ 7" },
  { code: "CN", label: "Chủ nhật" },
];

export function WeeklyProgress() {
  const [workouts, setWorkouts] = useState<WorkoutSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/Workout`);
        if (!response.ok) {
          throw new Error("Không thể tải danh sách bài tập tuần.");
        }
        const payload = (await response.json()) as WorkoutsApiResponse;
        setWorkouts(payload.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi bất ngờ.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWorkouts();
  }, []);

  const schedule = useMemo(() => {
    const scheduled = workouts.slice(0, baseWeekDays.length);
    return baseWeekDays.map((day, index) => {
      const workout = scheduled[index];
      if (!workout) {
        return {
          day: day.code,
          label: day.label,
          hasWorkout: false,
          workoutTitle: "Nghỉ ngơi",
        };
      }

      return {
        day: day.code,
        label: day.label,
        hasWorkout: true,
        workoutTitle: `${workout.name} • ${mapCategoryLabel(workout.category)}`,
      };
    });
  }, [workouts]);

  const scheduledDays = schedule.filter((entry) => entry.hasWorkout).length;
  const progress = (scheduledDays / baseWeekDays.length) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-t-lg" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Tiến độ tuần này
            </CardTitle>
            <CardDescription>
              Đã sắp xếp {scheduledDays}/{baseWeekDays.length} buổi tập
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{isLoading ? "Đang tải..." : "Tiến độ"}</span>
            <span>
              {scheduledDays}/{baseWeekDays.length} ngày
            </span>
          </div>
          <Progress value={progress} className="h-3 rounded-full" />
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-lg">
            {error}
          </p>
        )}

        <div className="grid grid-cols-7 gap-3">
          {schedule.map((entry) => (
            <div key={entry.day} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold shadow-md transition-all ${
                  entry.hasWorkout
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {entry.day}
              </div>
              <p className="text-xs mt-1 text-muted-foreground text-center">
                {entry.label}
              </p>
              {entry.hasWorkout && (
                <p className="mt-1 text-[10px] text-center text-foreground/70 line-clamp-2">
                  {entry.workoutTitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
