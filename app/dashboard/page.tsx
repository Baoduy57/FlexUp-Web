"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { TodayWorkout } from "@/components/dashboard/today-workout";
import { WeeklyProgress } from "@/components/dashboard/weekly-progress";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TipsAndReminders } from "@/components/dashboard/tips-reminders";
import { motion } from "framer-motion";
import { Flame, Activity } from "lucide-react";

export default function DashboardPage() {
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
                  Thái Bảo Duy
                </span>
                !
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Hôm nay là một ngày tuyệt vời để tiếp tục hành trình fitness của
                bạn 🚀
              </p>
            </div>

            {/* Avatar + Quick stats */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary font-semibold">
                    <Flame className="h-4 w-4" />5 ngày
                  </div>
                  <p className="text-xs text-muted-foreground">Chuỗi tập</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-rose-500 font-semibold">
                    <Activity className="h-4 w-4" />
                    1,247 kcal
                  </div>
                  <p className="text-xs text-muted-foreground">Calo hôm nay</p>
                </div>
              </div>
              <img
                src="/user-avatar.jpg"
                alt="User avatar"
                className="w-14 h-14 rounded-full border-2 border-primary shadow-md"
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
