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

interface Exercise {
  name: string;
  video: string;
  description: string;
  steps: string[];
  duration: number;
  rest: number;
}

interface WorkoutCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  category: string;
  exercises: Exercise[];
  image: string;
  isBookmarked?: boolean;
}

export function WorkoutCard({
  id,
  title,
  description,
  duration,
  difficulty,
  category,
  exercises,
  image,
  isBookmarked = false,
}: WorkoutCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Dễ":
        return "text-white";
      case "Trung bình":
        return "text-white";
      case "Khó":
        return "text-white";
      default:
        return "text-white";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        {/* Ảnh + badge + bookmark */}
        <div className="relative">
          <Link href={`/workouts/${id}`}>
            <motion.img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Badge độ khó + Bookmark */}
          <div className="absolute top-3 right-3 flex gap-2 items-center">
            <Badge
              className={`${getDifficultyColor(
                difficulty
              )} text-xs px-2 py-0.5 rounded-full shadow-sm`}
            >
              {difficulty}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full bg-white/90 dark:bg-gray-800/80 hover:bg-primary/10 transition"
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isBookmarked
                    ? "fill-current text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          </div>

          {/* Badge category */}
          <div className="absolute bottom-3 left-3">
            <Badge
              variant="default"
              className="rounded-full px-3 py-1 shadow-sm"
            >
              {category}
            </Badge>
          </div>
        </div>

        {/* Nội dung */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span>{exercises.length} bài tập</span>
            </div>
          </div>

          {/* Nút bắt đầu tập */}
          <Link href={`/workouts/${id}`} className="block">
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
