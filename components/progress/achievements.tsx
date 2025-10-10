"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Zap, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  earnedDate?: string;
  category: "workout" | "nutrition" | "consistency" | "milestone";
}

const achievements: Achievement[] = [
  {
    id: "first-workout",
    title: "Bước đầu tiên",
    description: "Hoàn thành buổi tập đầu tiên",
    icon: <Zap className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-01",
    category: "workout",
  },
  {
    id: "week-streak",
    title: "Tuần hoàn hảo",
    description: "Tập luyện đầy đủ trong 7 ngày liên tiếp",
    icon: <Calendar className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-08",
    category: "consistency",
  },
  {
    id: "weight-goal",
    title: "Đạt mục tiêu cân nặng",
    description: "Giảm được 5kg so với ban đầu",
    icon: <Target className="h-6 w-6" />,
    earned: false,
    progress: 3,
    maxProgress: 5,
    category: "milestone",
  },
  {
    id: "nutrition-master",
    title: "Chuyên gia dinh dưỡng",
    description: "Theo dõi dinh dưỡng trong 30 ngày",
    icon: <Star className="h-6 w-6" />,
    earned: false,
    progress: 18,
    maxProgress: 30,
    category: "nutrition",
  },
  {
    id: "strength-beast",
    title: "Sức mạnh vượt trội",
    description: "Tăng 20% sức mạnh trong tất cả bài tập chính",
    icon: <Trophy className="h-6 w-6" />,
    earned: false,
    progress: 15,
    maxProgress: 20,
    category: "workout",
  },
  {
    id: "consistency-king",
    title: "Vua kiên trì",
    description: "Tập luyện liên tục trong 30 ngày",
    icon: <Award className="h-6 w-6" />,
    earned: false,
    progress: 12,
    maxProgress: 30,
    category: "consistency",
  },
];

const categoryColors = {
  workout: "from-green-400 to-cyan-500",
  nutrition: "from-blue-400 to-indigo-600",
  consistency: "from-purple-400 to-pink-600",
  milestone: "from-orange-400 to-red-600",
};

const categoryLabels = {
  workout: "Tập luyện",
  nutrition: "Dinh dưỡng",
  consistency: "Kiên trì",
  milestone: "Cột mốc",
};

export function Achievements() {
  const earnedAchievements = achievements.filter((a) => a.earned);
  const inProgressAchievements = achievements.filter((a) => !a.earned);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Tổng huy hiệu",
            value: earnedAchievements.length,
            desc: `Đã đạt ${earnedAchievements.length}/${achievements.length}`,
            icon: <Trophy className="h-5 w-5 text-yellow-500" />,
            bg: "from-green-100 to-green-200", // màu nền
          },
          {
            title: "Gần hoàn thành",
            value: inProgressAchievements.filter(
              (a) =>
                a.progress && a.maxProgress && a.progress / a.maxProgress > 0.7
            ).length,
            desc: "Sắp đạt được",
            icon: <Target className="h-5 w-5 text-blue-500" />,
            bg: "from-blue-100 to-indigo-200",
          },
          {
            title: "Điểm thành tích",
            value: earnedAchievements.length * 100,
            desc: "Tổng điểm tích lũy",
            icon: <Star className="h-5 w-5 text-purple-500" />,
            bg: "from-pink-100 to-purple-200",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card
              className={`bg-gradient-to-br ${stat.bg} shadow-lg rounded-2xl hover:scale-105 transition-transform border-0`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600">{stat.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Earned Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl hover:scale-[1.02] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Huy hiệu đã đạt
              </CardTitle>
              <CardDescription>
                Những thành tích bạn đã hoàn thành
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {earnedAchievements.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Chưa có huy hiệu nào. Hãy bắt đầu tập luyện để nhận huy hiệu
                  đầu tiên!
                </p>
              ) : (
                earnedAchievements.map((achievement, i) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-100/60 to-green-200/60 backdrop-blur hover:shadow-md transition"
                  >
                    <div className="text-green-600 bg-white/60 rounded-full p-2 shadow">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <Badge
                          className={`bg-gradient-to-r ${
                            categoryColors[achievement.category]
                          } text-white`}
                        >
                          {categoryLabels[achievement.category]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.earnedDate && (
                        <p className="text-xs text-green-600 mt-1">
                          Đạt được vào{" "}
                          {new Date(achievement.earnedDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* In Progress Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl hover:scale-[1.02] transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-blue-500" />
                Đang tiến tới
              </CardTitle>
              <CardDescription>Huy hiệu bạn đang cố gắng đạt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {inProgressAchievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-100/60 to-indigo-200/60 backdrop-blur hover:shadow-md transition"
                >
                  <div className="text-blue-600 bg-white/60 rounded-full p-2 shadow">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <Badge variant="outline">
                        {categoryLabels[achievement.category]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    {achievement.progress !== undefined &&
                      achievement.maxProgress && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Tiến độ</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <div className="relative w-full h-2 bg-white/40 rounded-full overflow-hidden">
                            <motion.div
                              className={`absolute left-0 top-0 h-2 bg-gradient-to-r ${
                                categoryColors[achievement.category]
                              }`}
                              initial={{ width: 0 }}
                              animate={{
                                width: `${
                                  (achievement.progress /
                                    achievement.maxProgress) *
                                  100
                                }%`,
                              }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center"
      >
        <Button
          size="lg"
          className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
        >
          Tiếp tục chinh phục mục tiêu
        </Button>
      </motion.div>
    </div>
  );
}
