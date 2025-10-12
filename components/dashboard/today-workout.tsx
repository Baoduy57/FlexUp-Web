import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Clock, Dumbbell } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import {
  mapCategoryLabel,
  mapDifficultyLabel,
  trainingGoalLabelMap,
  trainingGoalToCategory,
} from "@/lib/workout-utils";
import { useAuth } from "@/lib/auth-context";

interface WorkoutExerciseDetail {
  exerciseId: number;
  name: string;
  sets?: number | null;
  repetitions?: number | null;
  durationSeconds?: number | null;
  restSeconds?: number | null;
}

interface WorkoutDetail {
  id: number;
  name: string;
  description: string;
  totalExercises: number;
  durationMinutes: number;
  difficultyLevel: string;
  category: string;
  exercises: WorkoutExerciseDetail[];
}

interface WorkoutListItem {
  id: number;
}

interface WorkoutsApiResponse {
  data?: WorkoutListItem[];
}

export function TodayWorkout() {
  const { user } = useAuth();
  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutOfDay = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const category = trainingGoalToCategory(user?.trainingGoal);
        let listUrl = `${API_BASE_URL}/api/Workout`;

        if (category) {
          const params = new URLSearchParams({ goal: category });
          listUrl = `${listUrl}?${params.toString()}`;
        }

        const listResponse = await fetch(listUrl);
        if (!listResponse.ok) {
          throw new Error("Không thể tải danh sách bài tập.");
        }
        const listPayload = (await listResponse.json()) as WorkoutsApiResponse;

        let firstWorkout = listPayload.data?.[0];

        if (!firstWorkout) {
          // Fallback: dùng danh sách chung
          const fallbackResponse = await fetch(`${API_BASE_URL}/api/Workout`);
          if (!fallbackResponse.ok) {
            throw new Error("Không thể tải danh sách bài tập.");
          }
          const fallbackPayload =
            (await fallbackResponse.json()) as WorkoutsApiResponse;
          firstWorkout = fallbackPayload.data?.[0];
        }

        if (!firstWorkout) {
          setWorkout(null);
          setError("Hiện chưa có bài tập nào được cấu hình.");
          return;
        }

        const detailResponse = await fetch(
          `${API_BASE_URL}/api/Workout/${firstWorkout.id}/detail`
        );
        if (!detailResponse.ok) {
          throw new Error("Không thể tải chi tiết bài tập.");
        }

        const detail = (await detailResponse.json()) as WorkoutDetail;
        setWorkout(detail);
        setCompleted(new Set());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi bất ngờ.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWorkoutOfDay();
  }, [user?.trainingGoal]);

  const progress = useMemo(() => {
    if (!workout || workout.exercises.length === 0) {
      return 0;
    }

    return (completed.size / workout.exercises.length) * 100;
  }, [workout, completed]);

  const handleToggleExercise = (exerciseId: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(exerciseId)) {
        next.delete(exerciseId);
      } else {
        next.add(exerciseId);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-blue-600" />
            Bài tập hôm nay
          </CardTitle>
          <CardDescription>Đang tải dữ liệu bài tập...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full rounded-full bg-muted animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (error || !workout) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-blue-600" />
            Bài tập hôm nay
          </CardTitle>
          <CardDescription>
            {error ?? "Không có bài tập nào được lên lịch."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const difficultyLabel = mapDifficultyLabel(workout.difficultyLevel);
  const categoryLabel = mapCategoryLabel(workout.category);
  const goalLabel =
    user?.trainingGoal &&
    trainingGoalLabelMap[user.trainingGoal.toLowerCase()] !== undefined
      ? trainingGoalLabelMap[user.trainingGoal.toLowerCase()]
      : categoryLabel;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-t-lg" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-blue-600" />
              {workout.name}
            </CardTitle>
            <CardDescription className="space-x-2">
              <span>{goalLabel}</span>
              <span>•</span>
              <span>{difficultyLabel}</span>
            </CardDescription>
          </div>
          <Badge variant="default" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {workout.durationMinutes} phút
          </Badge>
        </div>
        <div className="mt-4 space-y-2 relative z-10">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-muted-foreground">
            {completed.size}/{workout.exercises.length} bài tập hoàn thành
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {workout.exercises.map((exercise) => {
          const exerciseId = exercise.exerciseId;
          const isCompleted = completed.has(exerciseId);
          const details: string[] = [];
          if (exercise.sets != null && exercise.repetitions != null) {
            details.push(`${exercise.sets} x ${exercise.repetitions}`);
          }
          if (exercise.durationSeconds != null) {
            const minutes = Math.max(
              1,
              Math.round(exercise.durationSeconds / 60)
            );
            details.push(`${minutes} phút`);
          }
          const subtitle =
            details.length > 0
              ? details.join(" • ")
              : "Bắt đầu ghi nhận tiến độ";

          return (
            <div
              key={exerciseId}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition"
            >
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
              </div>
              <Button
                size="sm"
                className={`${
                  isCompleted
                    ? "bg-muted text-foreground hover:bg-muted/70"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                }`}
                onClick={() => handleToggleExercise(exerciseId)}
              >
                <Play className="h-4 w-4 mr-1" />
                {isCompleted ? "Đã hoàn thành" : "Bắt đầu"}
              </Button>
            </div>
          );
        })}

        <Button
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
          size="lg"
          onClick={() =>
            setCompleted(new Set(workout.exercises.map((ex) => ex.exerciseId)))
          }
        >
          Hoàn thành toàn bộ
        </Button>
      </CardContent>
    </Card>
  );
}
