"use client";

import { useAuth } from "@/lib/auth-context";
import { getMealPlanByGoal, type Meal } from "@/data/meal-plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, TrendingUp, Flame, Droplet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function MealSuggestions() {
  const { user } = useAuth();
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  
  const trainingGoal = (user?.trainingGoal || "maintain") as "muscle-gain" | "fat-loss" | "maintain" | "endurance";
  const mealPlan = getMealPlanByGoal(trainingGoal)!;

  const goalNames: Record<string, string> = {
    "muscle-gain": "Tăng cơ",
    "fat-loss": "Giảm mỡ",
    "maintain": "Duy trì",
    "endurance": "Tăng sức bền"
  };

  const goalDescriptions: Record<string, string> = {
    "muscle-gain": "Chế độ ăn giàu protein và calo cao để hỗ trợ tăng cơ bắp",
    "fat-loss": "Chế độ ăn giảm calo với dinh dưỡng cân bằng để đốt mỡ hiệu quả",
    "maintain": "Chế độ ăn cân bằng để duy trì cân nặng và sức khỏe",
    "endurance": "Chế độ ăn giàu carbohydrate để hỗ trợ các hoạt động thể lực kéo dài"
  };

  const difficultyColors: Record<string, string> = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
  };

  const difficultyLabels: Record<string, string> = {
    easy: "Dễ",
    medium: "Trung bình",
    hard: "Khó"
  };

  const mealTypes = [
    {
      value: "breakfast",
      label: "Bữa sáng",
      icon: "🌅",
      color: "from-yellow-200 to-orange-400",
    },
    {
      value: "lunch",
      label: "Bữa trưa",
      icon: "☀️",
      color: "from-green-200 to-emerald-400",
    },
    {
      value: "dinner",
      label: "Bữa tối",
      icon: "🌙",
      color: "from-blue-200 to-indigo-400",
    },
    {
      value: "snack",
      label: "Bữa phụ",
      icon: "🍎",
      color: "from-pink-200 to-red-400",
    },
  ];

  const MealCard = ({ meal }: { meal: Meal }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={meal.image} 
          alt={meal.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{meal.name}</CardTitle>
            <CardDescription className="mt-2">{meal.description}</CardDescription>
          </div>
          <Badge className={difficultyColors[meal.difficulty]}>
            {difficultyLabels[meal.difficulty]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{meal.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{meal.servings} người</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{meal.rating}/5</span>
          </div>
        </div>

        <Link href={"/nutrition/" + meal.id}>
          <Button className="w-full">Xem công thức</Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Thực đơn cho mục tiêu: {goalNames[trainingGoal]}</CardTitle>
          </div>
          <CardDescription className="text-base">
            {goalDescriptions[trainingGoal]}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mealPlan.dailyCalories}</div>
            <p className="text-xs text-muted-foreground">kcal/ngày</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mealPlan.dailyProtein}g</div>
            <p className="text-xs text-muted-foreground">mỗi ngày</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbs</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mealPlan.dailyCarbs}g</div>
            <p className="text-xs text-muted-foreground">mỗi ngày</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nước</CardTitle>
            <Droplet className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mealPlan.waterIntake}L</div>
            <p className="text-xs text-muted-foreground">mỗi ngày</p>
          </CardContent>
        </Card>
      </div>

      {/* Custom Meal Type Tabs with Gradient Colors */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mealTypes.map((meal) => (
            <motion.div
              key={meal.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`cursor-pointer h-24 rounded-xl shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden transition ${
                  selectedMealType === meal.value
                    ? "ring-2 ring-primary"
                    : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedMealType(meal.value)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${meal.color} opacity-80`}
                />
                <div className="relative z-10">
                  <div className="text-2xl mb-1">{meal.icon}</div>
                  <div className="font-semibold">{meal.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Meal Content */}
        <div className="grid gap-4 md:grid-cols-2">
          {selectedMealType === "breakfast" && mealPlan.meals.breakfast.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
          {selectedMealType === "lunch" && mealPlan.meals.lunch.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
          {selectedMealType === "dinner" && mealPlan.meals.dinner.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
          {selectedMealType === "snack" && mealPlan.meals.snack.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}
