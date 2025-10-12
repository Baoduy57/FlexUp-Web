"use client";

import { useEffect, useRef } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TodayWorkout } from "@/components/dashboard/today-workout";
import { WeeklyProgress } from "@/components/dashboard/weekly-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TipsAndReminders } from "@/components/dashboard/tips-reminders";
import { motion } from "framer-motion";
import { Flame, Activity } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const trainingGoalLabels: Record<string, string> = {
  "muscle-gain": "Tăng cơ",
  "fat-loss": "Giảm mỡ",
  maintain: "Giữ dáng",
  endurance: "Tăng sức bền",
};

const getDisplayName = (firstName?: string, lastName?: string, email?: string) => {
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  if (fullName) return fullName;
  if (email) return email.split("@")[0];
  return "bạn";
};

export default function DashboardPage() {
  const { user, refreshProfile } = useAuth();
  const hasRequestedProfile = useRef(false);

  useEffect(() => {
    if (!hasRequestedProfile.current) {
      hasRequestedProfile.current = true;
      void refreshProfile();
    }
  }, [refreshProfile]);

  const displayName = getDisplayName(
    user?.firstName,
    user?.lastName,
    user?.email
  );
  const trainingGoalLabel =
    (user?.trainingGoal && trainingGoalLabels[user.trainingGoal]) ||
    (user?.trainingGoal ? user.trainingGoal : null);
  const welcomeSubtitle = user?.hasCompletedProfile
    ? trainingGoalLabel
      ? `Mục tiêu hiện tại của bạn: ${trainingGoalLabel}. Hãy tiếp tục giữ phong độ!`
      : "Sẵn sàng cho buổi tập tiếp theo chứ? 🚀"
    : "Hoàn thành hồ sơ để nhận gợi ý tập luyện chính xác hơn.";

  const weightLabel = user?.weight ? `${user.weight} kg` : "Chưa cập nhật";
  const heightLabel = user?.height ? `${user.height} cm` : "Chưa cập nhật";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20">
      <Sidebar />
      <main className="md:ml-64 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Chào mừng trở lại,{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {displayName}
                </span>
                !
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                {welcomeSubtitle}
              </p>
            </div>

            {/* Avatar + Quick stats */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary font-semibold">
                    <Flame className="h-4 w-4" />
                    {weightLabel}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cân nặng hiện tại
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-rose-500 font-semibold">
                    <Activity className="h-4 w-4" />
                    {heightLabel}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Chiều cao của bạn
                  </p>
                </div>
              </div>
              <img
                src={user?.profileImageUrl ?? "/user-avatar.jpg"}
                alt="User avatar"
                className="w-14 h-14 rounded-full border-2 border-primary shadow-md object-cover"
              />
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatsCards />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TodayWorkout />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <WeeklyProgress />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <QuickActions />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TipsAndReminders />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
