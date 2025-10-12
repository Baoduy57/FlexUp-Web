"use client";

import { Sidebar } from "@/components/layout/sidebar";
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
              Dinh dưỡng
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Thực đơn gợi ý và lượng nước phù hợp với mục tiêu tập luyện của bạn
            </p>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="suggestions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/30 p-1 backdrop-blur-sm">
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
              <TabsContent value="suggestions" className="space-y-6">
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <MealSuggestions />
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
