"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Plus, Minus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getWaterIntakeByGoal } from "@/data/meal-plans";

export function WaterTracker() {
  const { user } = useAuth();
  
  // Get dynamic water target based on user's training goal
  const trainingGoal = (user?.trainingGoal || "maintain") as "muscle-gain" | "fat-loss" | "maintain" | "endurance";
  const dailyTarget = getWaterIntakeByGoal(trainingGoal);
  
  const [waterIntake, setWaterIntake] = useState(0); // liters

  const addWater = (amount: number) => {
    setWaterIntake(Math.min(waterIntake + amount, dailyTarget + 1));
  };

  const removeWater = (amount: number) => {
    setWaterIntake(Math.max(waterIntake - amount, 0));
  };

  const progressPercentage = (waterIntake / dailyTarget) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl rounded-2xl border border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Droplets className="h-5 w-5" />
            Theo dõi nước uống
          </CardTitle>
          <CardDescription className="text-blue-50">
            Duy trì đủ nước cho cơ thể
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Water Progress */}
          <div className="text-center space-y-3">
            <motion.div
              key={waterIntake}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-5xl font-extrabold text-blue-600"
            >
              {waterIntake.toFixed(1)}L
            </motion.div>
            <div className="text-sm text-muted-foreground">
              Mục tiêu: {dailyTarget}L
            </div>

            {/* ✅ chỉ giữ Progress, bỏ motion.div bọc ngoài */}
            <Progress
              value={progressPercentage}
              className="w-full h-3 rounded-full"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={progressPercentage >= 100 ? "done" : "remaining"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-muted-foreground"
              >
                {progressPercentage >= 100
                  ? "🎉 Đã hoàn thành mục tiêu!"
                  : `Còn ${(dailyTarget - waterIntake).toFixed(1)}L`}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Add */}
          <div className="space-y-3">
            <h4 className="font-medium">Thêm nhanh:</h4>
            <div className="grid grid-cols-2 gap-3">
              {[0.25, 0.5, 0.75, 1].map((amount, idx) => (
                <motion.div whileTap={{ scale: 0.9 }} key={idx}>
                  <Button
                    variant="outline"
                    onClick={() => addWater(amount)}
                    className="flex items-center gap-2 rounded-xl shadow-sm hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4 text-blue-500" />
                    {amount * 1000}ml
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Adjust */}
          <div className="flex items-center justify-center gap-6">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeWater(0.25)}
                className="rounded-full"
              >
                <Minus className="h-4 w-4 text-red-500" />
              </Button>
            </motion.div>
            <span className="text-sm text-muted-foreground">Điều chỉnh</span>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addWater(0.25)}
                className="rounded-full"
              >
                <Plus className="h-4 w-4 text-green-500" />
              </Button>
            </motion.div>
          </div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm"
          >
            <h5 className="font-medium text-blue-900 mb-2">
              💡 Mẹo uống nước:
            </h5>
            <ul className="text-sm text-blue-800 space-y-1 list-disc pl-4">
              <li>Uống 1 ly nước ngay khi thức dậy</li>
              <li>Uống nước trước mỗi bữa ăn 30 phút</li>
              <li>Mang theo chai nước khi tập luyện</li>
            </ul>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
