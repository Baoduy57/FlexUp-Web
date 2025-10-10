"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";
import { meals } from "@/data/meals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Star, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface Props {
  params: { id: string };
}

export default function MealDetailPage({ params }: Props) {
  const meal = meals.find((m) => m.id === params.id);
  if (!meal) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="p-4 md:p-2">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="relative h-96 md:h-[480px] overflow-hidden rounded-b-3xl shadow-lg">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white space-y-2">
              <h1 className="text-5xl font-bold drop-shadow-lg">{meal.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {meal.rating}
                </span>
                <Badge className="bg-white/20 backdrop-blur text-white border border-white/30">
                  {meal.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-10">
            {/* Back */}
            <Link href="/nutrition">
              <Button variant="ghost" size="lg" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>

            {/* Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Clock,
                  label: "Thời gian",
                  value: meal.prepTime,
                  color: "from-green-400 to-emerald-500",
                },
                {
                  icon: Users,
                  label: "Phần ăn",
                  value: meal.servings,
                  color: "from-blue-400 to-indigo-500",
                },
                {
                  icon: Flame,
                  label: "Calories",
                  value: meal.calories,
                  color: "from-red-400 to-orange-500",
                },
              ].map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Card className="rounded-2xl backdrop-blur-md bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition">
                    <CardContent className="flex flex-col items-center py-6">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-br ${info.color} text-white shadow`}
                      >
                        <info.icon className="h-6 w-6" />
                      </div>
                      <p className="mt-3 font-semibold text-lg">{info.value}</p>
                      <span className="text-xs text-muted-foreground">
                        {info.label}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Macros */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="rounded-2xl backdrop-blur-md bg-white/70 border border-white/20 shadow-lg hover:shadow-xl transition">
                  <CardContent className="space-y-4 py-6">
                    {[
                      {
                        label: "Protein",
                        value: meal.protein,
                        color: "from-green-400 to-emerald-500",
                      },
                      {
                        label: "Carbs",
                        value: meal.carbs,
                        color: "from-blue-400 to-indigo-500",
                      },
                      {
                        label: "Fat",
                        value: meal.fat,
                        color: "from-purple-400 to-pink-500",
                      },
                    ].map((m, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{m.label}</span>
                          <span className="font-semibold">{m.value}g</span>
                        </div>
                        <Progress value={m.value}>
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${m.color} animate-gradient-x`}
                            style={{ width: `${Math.min(m.value, 100)}%` }}
                          />
                        </Progress>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Ingredients */}
            <Card className="rounded-2xl backdrop-blur-md bg-white/70 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Nguyên liệu</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meal.ingredients.map((ing, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {ing}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Steps */}
            <Card className="rounded-2xl backdrop-blur-md bg-white/70 border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle>Cách làm</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-5">
                  {meal.steps.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3 items-start text-muted-foreground"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow hover:scale-105 transition">
                        {i + 1}
                      </span>
                      <p>{step}</p>
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                className="px-10 bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
              >
                + Thêm vào kế hoạch ăn uống
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
