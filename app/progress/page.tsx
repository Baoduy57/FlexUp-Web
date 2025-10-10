"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { BodyMeasurements } from "@/components/progress/body-measurements";
import { ProgressCharts } from "@/components/progress/progress-charts";
import { Achievements } from "@/components/progress/achievements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function ProgressPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20">
      {/* Background Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]" />
      <Sidebar />

      <main className="relative md:ml-64 p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto space-y-10"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Theo dõi tiến độ
            </h1>
            <p className="text-muted-foreground mt-2">
              Xem tiến độ tập luyện và đạt được mục tiêu của bạn
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-xl bg-white/10 backdrop-blur-md p-1">
                <TabsTrigger
                  value="charts"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
                >
                  Biểu đồ tiến độ
                </TabsTrigger>
                <TabsTrigger
                  value="measurements"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
                >
                  Chỉ số cơ thể
                </TabsTrigger>
                <TabsTrigger
                  value="achievements"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
                >
                  Thành tích
                </TabsTrigger>
              </TabsList>

              <TabsContent value="charts" className="space-y-6">
                <ProgressCharts />
              </TabsContent>

              <TabsContent value="measurements" className="space-y-6">
                <BodyMeasurements />
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <Achievements />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
