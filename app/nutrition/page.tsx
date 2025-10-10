"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { DailyNutritionOverview } from "@/components/nutrition/daily-nutrition-overview";
import { MealLogger } from "@/components/nutrition/meal-logger";
import { MealSuggestions } from "@/components/nutrition/meal-suggestions";
import { WaterTracker } from "@/components/nutrition/water-tracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20 flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <motion.div
            className="pt-12 md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Theo dõi dinh dưỡng
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Quản lý chế độ ăn uống và đạt được mục tiêu dinh dưỡng của bạn
            </p>
          </motion.div>

          {/* Daily Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DailyNutritionOverview />
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="log-meal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted/30 p-1 backdrop-blur-sm">
              <TabsTrigger
                value="log-meal"
                className="rounded-lg px-3 py-2 text-sm font-medium transition-all
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500
      data-[state=active]:text-white data-[state=active]:shadow-md
      hover:scale-[1.05]"
              >
                Ghi nhận bữa ăn
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="rounded-lg px-3 py-2 text-sm font-medium transition-all
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500
      data-[state=active]:text-white data-[state=active]:shadow-md
      hover:scale-[1.05]"
              >
                Gợi ý thực đơn
              </TabsTrigger>
              <TabsTrigger
                value="water"
                className="rounded-lg px-3 py-2 text-sm font-medium transition-all
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500
      data-[state=active]:text-white data-[state=active]:shadow-md
      hover:scale-[1.05]"
              >
                Theo dõi nước
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="log-meal" className="space-y-6">
                <motion.div
                  key="log-meal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MealLogger />
                </motion.div>
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-6">
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-6 lg:grid-cols-1">
                    <MealSuggestions />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="water" className="space-y-6">
                <motion.div
                  key="water"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center items-start w-full">
                    <div className="max-w-md w-full">
                      <WaterTracker />
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
