"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WorkoutTimer } from "@/components/workouts/workout-timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { API_BASE_URL } from "@/lib/config";
import { mapCategoryLabel, mapDifficultyLabel } from "@/lib/workout-utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

interface WorkoutExerciseDetail {
  exerciseId: number;
  name: string;
  imageUrl?: string | null;
  orderInWorkout: number;
  sets?: number | null;
  repetitions?: number | null;
  durationSeconds?: number | null;
  restSeconds?: number | null;
  description?: string | null;
  targetMuscles?: string | null;
  steps: string[];
  videoUrl?: string | null;
}

interface WorkoutDetail {
  id: number;
  name: string;
  description: string;
  totalExercises: number;
  durationMinutes: number;
  caloriesBurn: number;
  difficultyLevel: string;
  imageUrl?: string | null;
  category: string;
  exercises: WorkoutExerciseDetail[];
}

interface WorkoutDetailPageProps {
  params: { id: string };
}

type ExerciseStatus = "pending" | "completed";

type SessionUIStatus = "not-started" | "in-progress" | "completed";

interface WorkoutSessionExerciseResponse {
  exerciseId: number;
  completed: boolean;
  durationSeconds?: number | null;
}

interface WorkoutSessionResponse {
  id: number;
  workoutId: number;
  completionStatus?: string | number;
  exercises?: WorkoutSessionExerciseResponse[];
}

const completionToUiStatus = (value: string | number | null | undefined): SessionUIStatus => {
  if (value === null || value === undefined) return "not-started";

  const normalized =
    typeof value === "number"
      ? value.toString()
      : value.toString().toLowerCase();

  // Handle string enum values from backend
  if (normalized === "completed" || normalized === "2") {
    return "completed";
  }
  if (normalized === "notstarted" || normalized === "0") {
    return "not-started";
  }
  // InProgress, Partial, or numeric 1, 3, 4
  if (normalized === "inprogress" || normalized === "1" || 
      normalized === "partial" || normalized === "3" ||
      normalized === "skipped" || normalized === "4") {
    return "in-progress";
  }
  
  return "not-started";
};

const sessionStatusLabel: Record<SessionUIStatus, string> = {
  "not-started": "Chưa bắt đầu",
  "in-progress": "Đang tập luyện",
  completed: "Đã hoàn thành",
};

export default function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exerciseStatuses, setExerciseStatuses] = useState<Record<number, ExerciseStatus>>({});
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [sessionStatus, setSessionStatus] = useState<SessionUIStatus>("not-started");
  const [loadingSession, setLoadingSession] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [pendingAutoStart, setPendingAutoStart] = useState(false);
  const autoStartAttemptedRef = useRef(false);

  const { accessToken } = useAuth();
  const { toast } = useToast();

  const buildPendingStatuses = useCallback(
    (currentWorkout: WorkoutDetail | null) => {
      const map: Record<number, ExerciseStatus> = {};
      currentWorkout?.exercises.forEach((exercise) => {
        map[exercise.exerciseId] = "pending";
      });
      return map;
    },
    []
  );

  const resetSessionState = useCallback(
    (currentWorkout: WorkoutDetail | null) => {
      setExerciseStatuses(buildPendingStatuses(currentWorkout));
      setSessionId(null);
      setSessionStatus("not-started");
      setSessionEnded(false);
    },
    [buildPendingStatuses]
  );

  useEffect(() => {
    const workoutId = Number(params.id);
    if (Number.isNaN(workoutId)) {
      setError("Mã bài tập không hợp lệ.");
      setIsLoading(false);
      return;
    }

    const fetchWorkoutDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/Workout/${workoutId}/detail`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Không tìm thấy bài tập.");
        }

        const detail = (await response.json()) as WorkoutDetail;
        setWorkout(detail);
        resetSessionState(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi bất ngờ.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchWorkoutDetail();
  }, [params.id, resetSessionState]);

  const applySession = useCallback(
    (session: WorkoutSessionResponse) => {
      if (!workout) return;

      const statuses = buildPendingStatuses(workout);
      session.exercises?.forEach((exercise) => {
        if (exercise.exerciseId in statuses) {
          statuses[exercise.exerciseId] = exercise.completed ? "completed" : "pending";
        }
      });

      const uiStatus = completionToUiStatus(session.completionStatus);
      setExerciseStatuses(statuses);
      setSessionId(session.id);
      setSessionStatus(uiStatus);
      setSessionEnded(uiStatus === "completed");
    },
    [buildPendingStatuses, workout]
  );

  const fetchLatestSession = useCallback(async () => {
    if (!workout || !accessToken) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/WorkoutSession/latest/${workout.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 404) {
        resetSessionState(workout);
        setPendingAutoStart(true);
        autoStartAttemptedRef.current = false;
        return;
      }

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const session = (await response.json()) as WorkoutSessionResponse;
      applySession(session);
      autoStartAttemptedRef.current = true;
      setPendingAutoStart(false);
    } catch (err) {
      console.error("Không thể tải phiên tập luyện gần nhất:", err);
    }
  }, [accessToken, applySession, resetSessionState, workout]);

  useEffect(() => {
    void fetchLatestSession();
  }, [fetchLatestSession]);

  const updateExerciseOnServer = async (exerciseId: number) => {
    if (!sessionId || !accessToken) return;
    try {
      await fetch(
        `${API_BASE_URL}/api/WorkoutSession/${sessionId}/exercises/${exerciseId}/progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            DurationSeconds: 60,
            Completed: true,
          }),
        }
      );
    } catch (err) {
      console.error("Không thể cập nhật tiến độ bài tập:", err);
    }
  };

  const handleExerciseCompleted = (exerciseId: number) => {
    if (sessionStatus !== "in-progress" || !sessionId) return;

    setExerciseStatuses((prev) => {
      if (prev[exerciseId] === "completed") {
        return prev;
      }
      return { ...prev, [exerciseId]: "completed" };
    });
    void updateExerciseOnServer(exerciseId);
  };

  const completedCount = useMemo(() => {
    if (!workout) return 0;
    return workout.exercises.reduce((acc, exercise) => {
      return acc + (exerciseStatuses[exercise.exerciseId] === "completed" ? 1 : 0);
    }, 0);
  }, [exerciseStatuses, workout]);

  const handleStartSession = useCallback(
    async (forceRestart = false) => {
      if (!workout || !accessToken) return;

      setLoadingSession(true);
      setSessionEnded(false);
      setPendingAutoStart(false);
      autoStartAttemptedRef.current = true;

      try {
        const response = await fetch(`${API_BASE_URL}/api/WorkoutSession/start`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            workoutId: workout.id,
            workoutDate: new Date().toISOString(),
            preloadExercises: true,
            forceRestart,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          // If the error is about completed workout, show specific message
          if (errorText.includes("already completed")) {
            throw new Error("Bài tập đã hoàn thành. Vui lòng chọn 'Tập lại' để bắt đầu phiên mới.");
          }
          throw new Error(errorText || "Không thể bắt đầu phiên tập luyện.");
        }

        const payload = await response.json();
        const session =
          (payload?.data as WorkoutSessionResponse | undefined) ??
          (payload as WorkoutSessionResponse);

        if (!session) {
          throw new Error("Không nhận được dữ liệu phiên tập luyện.");
        }

        applySession(session);
        if (forceRestart) {
          toast({
            title: "Bắt đầu lại",
            description: "Phiên tập luyện mới đã được khởi tạo.",
          });
        }
      } catch (err) {
        autoStartAttemptedRef.current = false;
        toast({
          title: "Không thể bắt đầu",
          description:
            err instanceof Error ? err.message : "Vui lòng thử lại sau.",
          variant: "destructive",
        });
      } finally {
        setLoadingSession(false);
      }
    },
    [accessToken, applySession, toast, workout]
  );

  useEffect(() => {
    if (!pendingAutoStart || !workout || !accessToken) {
      return;
    }
    if (loadingSession || autoStartAttemptedRef.current) {
      return;
    }

    void handleStartSession(false);
  }, [accessToken, handleStartSession, loadingSession, pendingAutoStart, workout]);


  useEffect(() => {
    if (!workout || !sessionId || sessionStatus !== "in-progress" || sessionEnded) {
      return;
    }

    const allCompleted = workout.exercises.every(
      (exercise) => exerciseStatuses[exercise.exerciseId] === "completed"
    );

    if (!allCompleted) {
      return;
    }

    const finalizeSession = async () => {
      if (accessToken) {
        try {
          await fetch(`${API_BASE_URL}/api/WorkoutSession/${sessionId}/end`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              TotalDurationSeconds: workout.exercises.length * 60,
              CaloriesBurned: workout.caloriesBurn,
            }),
          });
        } catch (err) {
          console.error("Không thể kết thúc phiên tập luyện:", err);
        }
      }

      setSessionStatus("completed");
      setSessionEnded(true);
      toast({
        title: "Hoàn thành!",
        description: "Bạn đã hoàn thành toàn bộ bài tập hôm nay.",
      });
      await fetchLatestSession();
    };

    void finalizeSession();
  }, [
    accessToken,
    exerciseStatuses,
    fetchLatestSession,
    sessionEnded,
    sessionId,
    sessionStatus,
    toast,
    workout,
  ]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Đang tải thông tin bài tập...</p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error ?? "Không tìm thấy bài tập."}</p>
          <Link href="/workouts">
            <Button variant="outline" className="rounded-lg">
              Trở về danh sách bài tập
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const difficultyLabel = mapDifficultyLabel(workout.difficultyLevel);
  const categoryLabel = mapCategoryLabel(workout.category);

  const renderSessionControls = () => {
    if (sessionStatus === "completed") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button size="lg" variant="secondary" disabled className="rounded-lg">
            Đã hoàn thành
          </Button>
          <Button
            size="lg"
            onClick={() => handleStartSession(true)}
            disabled={loadingSession}
            className="rounded-lg"
          >
            {loadingSession ? "Đang khởi tạo..." : "Tập lại"}
          </Button>
        </div>
      );
    }

    if (sessionStatus === "in-progress") {
      return (
        <div className="flex flex-wrap gap-3">
          <Button size="lg" variant="secondary" disabled className="rounded-lg">
            Đang tập luyện
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleStartSession(true)}
            disabled={loadingSession}
            className="rounded-lg"
          >
            {loadingSession ? "Đang khởi tạo..." : "Bắt đầu lại"}
          </Button>
        </div>
      );
    }

    return (
      <Button
        size="lg"
        onClick={() => handleStartSession(false)}
        disabled={loadingSession}
        className="rounded-lg"
      >
        {loadingSession ? "Đang khởi tạo..." : "Bắt đầu tập"}
      </Button>
    );
  };


  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/workouts">
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 rounded-lg border border-transparent hover:border-primary/40 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {workout.name}
              </h1>
              <p className="text-muted-foreground">{workout.description}</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>
                  Độ khó: <span className="font-medium text-foreground">{difficultyLabel}</span>
                </span>
                <span>
                  Danh mục: <span className="font-medium text-foreground">{categoryLabel}</span>
                </span>
                <span>
                  Thời lượng: <span className="font-medium text-foreground">{workout.durationMinutes} phút</span>
                </span>
                <span>
                  Ước tính calo: <span className="font-medium text-foreground">{workout.caloriesBurn} kcal</span>
                </span>
                <span>
                  Tiến độ: <span className="font-medium text-foreground">{completedCount}/{workout.exercises.length} bài tập</span>
                </span>
                <span>
                  Trạng thái phiên: <span className="font-medium text-foreground">{sessionStatusLabel[sessionStatus]}</span>
                </span>
              </div>
              {renderSessionControls()}
            </div>
          </motion.div>

          <div className="space-y-8">
            {workout.exercises.map((exercise, index) => {
              const isCompleted = exerciseStatuses[exercise.exerciseId] === "completed";

              const detailSegments: string[] = ["60 giây"];
              if (exercise.sets != null && exercise.repetitions != null) {
                detailSegments.push(`${exercise.sets} x ${exercise.repetitions} lần`);
              }
              if (exercise.restSeconds != null) {
                detailSegments.push(`Nghỉ ${exercise.restSeconds} giây`);
              }

              const steps =
                exercise.steps && exercise.steps.length > 0
                  ? exercise.steps
                  : ["Hướng dẫn sẽ được cập nhật sớm."];

              return (
                <motion.div
                  key={exercise.exerciseId ?? index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg rounded-xl border border-border">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <span>{exercise.name}</span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{detailSegments.join(" • ")}</span>
                          {isCompleted && (
                            <Badge variant="default" className="bg-green-500">
                              Đã hoàn thành
                            </Badge>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {exercise.videoUrl ? (
                        <motion.video
                          controls
                          className="w-full rounded-xl shadow-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <source src={exercise.videoUrl} type="video/mp4" />
                        </motion.video>
                      ) : exercise.imageUrl ? (
                        <motion.img
                          src={exercise.imageUrl}
                          alt={exercise.name}
                          className="w-full rounded-xl shadow-md object-cover"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      ) : null}

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Mô tả</h3>
                        <p className="text-muted-foreground">
                          {exercise.description ?? "Thông tin chi tiết sẽ được cập nhật sớm."}
                        </p>
                        {exercise.targetMuscles && (
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Nhóm cơ chính:</span>{" "}
                            {exercise.targetMuscles}
                          </p>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">Các bước thực hiện</h3>
                        <ul className="space-y-2">
                          {steps.map((step, stepIndex) => (
                            <li
                              key={stepIndex}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <WorkoutTimer
                        exerciseName={exercise.name}
                        completed={isCompleted}
                        disabled={sessionStatus !== "in-progress"}
                        durationSeconds={60}
                        onComplete={() => handleExerciseCompleted(exercise.exerciseId)}
                        onSkip={() => handleExerciseCompleted(exercise.exerciseId)}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {sessionEnded && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
                Tuyệt vời! Bạn đã hoàn thành toàn bộ bài tập hôm nay.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}


