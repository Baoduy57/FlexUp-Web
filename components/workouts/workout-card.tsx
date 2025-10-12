"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Play, Bookmark } from "lucide-react";
import Link from "next/link";
import { mapCategoryLabel, mapDifficultyLabel } from "@/lib/workout-utils";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { API_BASE_URL } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";

interface WorkoutSummary {
  id: number;
  name: string;
  description: string;
  durationMinutes: number;
  totalExercises: number;
  difficultyLevel: string;
  category: string;
  imageUrl?: string | null;
}

interface WorkoutCardProps {
  workout: WorkoutSummary;
  isBookmarked?: boolean;
  onBookmarkChange?: (workoutId: number, isBookmarked: boolean) => void;
}

export function WorkoutCard({ workout, isBookmarked = false, onBookmarkChange }: WorkoutCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  const { toast } = useToast();

  const imageSrc = workout.imageUrl || "/placeholder.svg";
  const difficultyLabel = mapDifficultyLabel(workout.difficultyLevel);
  const categoryLabel = mapCategoryLabel(workout.category);
  const durationLabel = `${workout.durationMinutes} phút`;

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!accessToken) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để lưu bài tập yêu thích",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const url = `${API_BASE_URL}/api/FavoriteWorkout/${workout.id}`;
      const method = bookmarked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite status");
      }

      const newBookmarkedState = !bookmarked;
      setBookmarked(newBookmarkedState);
      
      toast({
        title: newBookmarkedState ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích",
        description: newBookmarkedState 
          ? `${workout.name} đã được lưu vào danh sách yêu thích` 
          : `${workout.name} đã được xóa khỏi danh sách yêu thích`,
      });

      onBookmarkChange?.(workout.id, newBookmarkedState);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái yêu thích",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Link href={`/workouts/${workout.id}`}>
            <motion.img
              src={imageSrc}
              alt={workout.name}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <div className="absolute top-3 right-3 flex gap-2 items-center">
            <Badge className="text-xs px-2 py-0.5 rounded-full shadow-sm text-white bg-black/40 backdrop-blur">
              {difficultyLabel}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-white/90 dark:bg-gray-800/80 hover:bg-primary/10 transition"
              onClick={handleBookmarkClick}
              disabled={loading}
            >
              <Bookmark
                className={`h-4 w-4 ${
                  bookmarked
                    ? "fill-current text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          </div>

          <div className="absolute bottom-3 left-3">
            <Badge variant="default" className="rounded-full px-3 py-1 shadow-sm">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {workout.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {workout.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{durationLabel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{workout.totalExercises} bài tập</span>
            </div>
          </div>

          <Link href={`/workouts/${workout.id}`} className="block">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:opacity-90 transition">
                <Play className="h-4 w-4 mr-2" />
                Bắt đầu tập
              </Button>
            </motion.div>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
