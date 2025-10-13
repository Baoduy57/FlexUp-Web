"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { WorkoutCard } from "@/components/workouts/workout-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";
import {
  trainingGoalLabelMap,
  trainingGoalToCategory,
} from "@/lib/workout-utils";
import { useAuth } from "@/lib/auth-context";

interface WorkoutSummary {
  id: number;
  name: string;
  description: string;
  totalExercises: number;
  durationMinutes: number;
  imageUrl?: string | null;
  difficultyLevel: string;
  category: string;
}

interface ApiWorkoutResponse {
  message?: string;
  data?: WorkoutSummary[];
}

interface FavoriteWorkoutPayload {
  workoutId: number | string;
  workout: WorkoutSummary;
}

interface FavoriteWorkoutApiResponse {
  message?: string;
  data?: FavoriteWorkoutPayload[];
}

const motionGridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function WorkoutsPage() {
  const { user, accessToken } = useAuth();
  const [allWorkouts, setAllWorkouts] = useState<WorkoutSummary[]>([]);
  const [recommendedWorkouts, setRecommendedWorkouts] = useState<WorkoutSummary[]>([]);
  const [favoriteWorkouts, setFavoriteWorkouts] = useState<WorkoutSummary[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [isLoadingAll, setIsLoadingAll] = useState(true);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [errorAll, setErrorAll] = useState<string | null>(null);
  const [errorRecommended, setErrorRecommended] = useState<string | null>(null);
  const [errorFavorites, setErrorFavorites] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoadingAll(true);
      setErrorAll(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/Workout`);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Không thể tải danh sách bài tập.");
        }

        const payload = (await response.json()) as ApiWorkoutResponse;
        setAllWorkouts(payload.data ?? []);
      } catch (err) {
        setErrorAll(err instanceof Error ? err.message : "Đã xảy ra lỗi bất ngờ.");
      } finally {
        setIsLoadingAll(false);
      }
    };

    void fetchWorkouts();
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      setIsLoadingRecommended(true);
      setErrorRecommended(null);

      try {
        const category = trainingGoalToCategory(user?.trainingGoal);
        let url = `${API_BASE_URL}/api/Workout`;

        if (category) {
          const params = new URLSearchParams({ goal: category });
          url = `${url}?${params.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Không thể tải danh sách đề xuất.");
        }

        const payload = (await response.json()) as ApiWorkoutResponse;
        const data = payload.data ?? [];

        if (data.length === 0 && category) {
          // fallback: if no workouts match goal, show all
          setRecommendedWorkouts(allWorkouts);
        } else {
          setRecommendedWorkouts(data);
        }
      } catch (err) {
        setErrorRecommended(err instanceof Error ? err.message : "Đã xảy ra lỗi bất ngờ.");
        setRecommendedWorkouts(allWorkouts);
      } finally {
        setIsLoadingRecommended(false);
      }
    };

    // Only fetch recommended once all workouts were loaded to support fallback
    if (!isLoadingAll) {
      void fetchRecommended();
    }
  }, [user?.trainingGoal, allWorkouts, isLoadingAll]);

  // Fetch favorite workouts
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!accessToken) {
        setIsLoadingFavorites(false);
        return;
      }

      setIsLoadingFavorites(true);
      setErrorFavorites(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/FavoriteWorkout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải danh sách yêu thích");
        }

        const payload = (await response.json()) as FavoriteWorkoutApiResponse;
        const favorites = payload.data ?? [];

        // Extract workout data from favorites
        const workouts = favorites.map((fav) => fav.workout);
        setFavoriteWorkouts(workouts);

        // Store favorite IDs for quick lookup
        const ids = new Set<number>(favorites.map((fav) => Number(fav.workoutId)));
        setFavoriteIds(ids);
      } catch (err) {
        setErrorFavorites(err instanceof Error ? err.message : "Đã xảy ra lỗi bất ngờ.");
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    void fetchFavorites();
  }, [accessToken]);

  const handleBookmarkChange = (workoutId: number, isBookmarked: boolean) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);
      if (isBookmarked) {
        newSet.add(workoutId);
      } else {
        newSet.delete(workoutId);
      }
      return newSet;
    });

    // Update favorite workouts list
    if (isBookmarked) {
      const workout = allWorkouts.find((w) => w.id === workoutId);
      if (workout && !favoriteWorkouts.some((w) => w.id === workoutId)) {
        setFavoriteWorkouts((prev) => [...prev, workout]);
      }
    } else {
      setFavoriteWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
    }
  };

  const filterBySearch = useCallback(
    (items: WorkoutSummary[]) => {
      const term = searchTerm.trim().toLowerCase();

      if (!term) {
        return items;
      }

      return items.filter(
        (workout) =>
          workout.name.toLowerCase().includes(term) ||
          workout.description.toLowerCase().includes(term)
      );
    },
    [searchTerm]
  );

  const visibleRecommended = useMemo(() => {
    const filtered = filterBySearch(recommendedWorkouts);
    if (!difficultyFilter) {
      return filtered;
    }
    return filtered.filter(
      (workout) => workout.difficultyLevel === difficultyFilter
    );
  }, [recommendedWorkouts, difficultyFilter, filterBySearch]);

  const visibleFavorites = useMemo(() => {
    const filtered = filterBySearch(favoriteWorkouts);
    if (!difficultyFilter) {
      return filtered;
    }
    return filtered.filter(
      (workout) => workout.difficultyLevel === difficultyFilter
    );
  }, [favoriteWorkouts, difficultyFilter, filterBySearch]);

  const recommendedHeading = (() => {
    const goalKey = user?.trainingGoal?.toLowerCase();
    if (!goalKey) {
      return "Bài tập đề xuất";
    }
    return `Bài tập phù hợp mục tiêu: ${
      trainingGoalLabelMap[goalKey] ?? "Cá nhân hóa"
    }`;
  })();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20 transition-colors">
      <Sidebar />
      <main className="md:ml-64 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="pt-12 md:pt-0 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Chương trình tập luyện
              </h1>
              <p className="text-muted-foreground mt-2">
                Khám phá các bài tập phù hợp với mục tiêu và cấp độ của bạn
              </p>
            </motion.div>
            <Link href="/workouts/create">
              <Button className="rounded-xl shadow-md hover:shadow-lg transition">
                <Plus className="h-4 w-4 mr-2" />
                Tạo bài tập
              </Button>
            </Link>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài tập..."
                className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <Select
              value={difficultyFilter ?? "all"}
              onValueChange={(value) =>
                setDifficultyFilter(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-full sm:w-56 rounded-xl">
                <SelectValue placeholder="Lọc theo độ khó" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả độ khó</SelectItem>
                <SelectItem value="Beginner">Dễ</SelectItem>
                <SelectItem value="Intermediate">Trung bình</SelectItem>
                <SelectItem value="Advanced">Khó</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {errorAll && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              {errorAll}
            </div>
          )}

          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="flex w-full justify-center gap-4 rounded-2xl bg-transparent p-1">
              <TabsTrigger
                value="recommended"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:scale-[1.05]"
              >
                Đề xuất
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:scale-[1.05]"
              >
                Yêu thích
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md hover:scale-[1.05]"
              >
                Tự tạo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl font-semibold text-foreground">{recommendedHeading}</h2>
                {user?.trainingGoal && (
                  <p className="text-sm text-muted-foreground">
                    Hồ sơ hiện tại:{" "}
                    <span className="font-medium text-foreground">
                      {trainingGoalLabelMap[user.trainingGoal.toLowerCase()] ??
                        user.trainingGoal}
                    </span>
                  </p>
                )}
              </div>
              {errorRecommended && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                  {errorRecommended}
                </div>
              )}
              {isLoadingRecommended ? (
                <p className="text-center text-muted-foreground">
                  Đang tải dữ liệu đề xuất...
                </p>
              ) : visibleRecommended.length > 0 ? (
                <AnimatePresence>
                  <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="show"
                    variants={motionGridVariants}
                  >
                    {visibleRecommended.map((workout) => (
                      <motion.div
                        key={workout.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <WorkoutCard 
                          workout={workout} 
                          isBookmarked={favoriteIds.has(workout.id)}
                          onBookmarkChange={handleBookmarkChange}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="rounded-xl border border-dashed border-muted-foreground/30 p-6 text-center text-muted-foreground">
                  Không có bài tập phù hợp với mục tiêu hiện tại. Hãy cập nhật hồ sơ hoặc thử thay đổi
                  bộ lọc để xem thêm lựa chọn khác.
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Bài tập yêu thích</h2>
                <p className="text-sm text-muted-foreground">
                  {visibleFavorites.length} bài tập
                </p>
              </div>
              {errorFavorites && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                  {errorFavorites}
                </div>
              )}
              {isLoadingFavorites ? (
                <p className="text-center text-muted-foreground py-12">
                  Đang tải danh sách yêu thích...
                </p>
              ) : visibleFavorites.length > 0 ? (
                <AnimatePresence>
                  <motion.div
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="show"
                    variants={motionGridVariants}
                  >
                    {visibleFavorites.map((workout) => (
                      <motion.div
                        key={workout.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <WorkoutCard 
                          workout={workout} 
                          isBookmarked={true}
                          onBookmarkChange={handleBookmarkChange}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-dashed border-muted-foreground/30 p-12 text-center"
                >
                  <p className="text-muted-foreground text-lg mb-2">Chưa có bài tập yêu thích nào</p>
                  <p className="text-sm text-muted-foreground">
                    Nhấn vào biểu tượng bookmark ⭐ để lưu bài tập yêu thích
                  </p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="custom" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">Chưa có bài tập tự tạo nào</p>
                <Link href="/workouts/create">
                  <Button className="mt-4 rounded-xl shadow-md hover:shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài tập đầu tiên
                  </Button>
                </Link>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
