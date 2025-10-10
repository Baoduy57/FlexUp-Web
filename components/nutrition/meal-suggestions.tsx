"use client";

import Link from "next/link";
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
import { Clock, Users, ChefHat, Star } from "lucide-react";
import { meals } from "@/data/meals";

export function MealSuggestions() {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-bold">
          <ChefHat className="h-6 w-6 text-blue-600" />
          Gợi ý thực đơn
        </CardTitle>
        <CardDescription>
          Các món ăn phù hợp với mục tiêu dinh dưỡng của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative border rounded-xl p-4 md:p-5 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex gap-4 md:gap-6">
              {/* Ảnh món ăn */}
              <motion.img
                src={meal.image || "/placeholder.svg"}
                alt={meal.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover shadow-sm group-hover:shadow-md transition"
                whileHover={{ rotate: 1 }}
              />

              {/* Nội dung */}
              <div className="flex-1 space-y-3">
                {/* Tên + rating */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-base md:text-lg">
                      {meal.name}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {meal.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{meal.rating}</span>
                  </div>
                </div>

                {/* Thời gian, khẩu phần, độ khó */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{meal.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{meal.servings} phần</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-0.5 text-xs"
                  >
                    {meal.difficulty}
                  </Badge>
                </div>

                {/* Nutrition stats */}
                <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm">
                  {[
                    { label: "Cal", value: meal.calories },
                    { label: "Protein", value: `${meal.protein}g` },
                    { label: "Carbs", value: `${meal.carbs}g` },
                    { label: "Fat", value: `${meal.fat}g` },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg"
                    >
                      <div className="font-semibold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nguyên liệu + nút */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1">
                    {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs rounded-full"
                      >
                        {ingredient}
                      </Badge>
                    ))}
                    {meal.ingredients.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs rounded-full"
                      >
                        +{meal.ingredients.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Link href={`/nutrition/${meal.id}`}>
                    <Button
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:opacity-90 transition"
                    >
                      Xem công thức
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
