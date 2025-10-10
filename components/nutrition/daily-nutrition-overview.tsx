"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Drumstick, Wheat, Egg, Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export function DailyNutritionOverview() {
  const stats = [
    {
      title: "Calo đã nạp",
      value: "1,350 / 2,000 kcal",
      percent: 67,
      icon: Flame,
      color: "from-orange-400 to-red-500",
    },
    {
      title: "Protein",
      value: "65g / 100g",
      percent: 65,
      icon: Drumstick,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Carbs",
      value: "180g / 250g",
      percent: 72,
      icon: Wheat,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Fat",
      value: "50g / 70g",
      percent: 71,
      icon: Egg,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Nước",
      value: "1.8L / 2.5L",
      percent: 72,
      icon: Droplets,
      color: "from-cyan-400 to-sky-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Card className="relative overflow-hidden group hover:scale-[1.02] hover:shadow-xl transition-all">
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 opacity-20 bg-gradient-to-br ${stat.color}`}
            />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.title}
              </CardTitle>
              <div
                className={`p-2 rounded-full bg-gradient-to-br ${stat.color} text-white shadow-md`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-3">
              <div className="text-lg font-semibold">{stat.value}</div>
              <Progress
                value={stat.percent}
                indicatorClassName={`bg-gradient-to-r ${stat.color}`}
              />
              <p className="text-xs text-muted-foreground">
                {stat.percent}% hoàn thành
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
