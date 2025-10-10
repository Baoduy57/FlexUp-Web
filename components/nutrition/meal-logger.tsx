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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Clock, Utensils } from "lucide-react";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  quantity: number;
}

export function MealLogger() {
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);

  // Danh sách thực phẩm mẫu
  const commonFoods = [
    {
      id: "1",
      name: "Cơm trắng",
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      serving: "100g",
    },
    {
      id: "2",
      name: "Thịt gà luộc",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      serving: "100g",
    },
    {
      id: "3",
      name: "Trứng gà",
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      serving: "1 quả",
    },
    {
      id: "4",
      name: "Chuối",
      calories: 89,
      protein: 1.1,
      carbs: 23,
      fat: 0.3,
      serving: "1 quả",
    },
    {
      id: "5",
      name: "Sữa tươi",
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fat: 1,
      serving: "100ml",
    },
    {
      id: "6",
      name: "Bánh mì",
      calories: 265,
      protein: 9,
      carbs: 49,
      fat: 3.2,
      serving: "100g",
    },
  ];

  const filteredFoods = commonFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Thêm món ăn
  const addFood = (food: (typeof commonFoods)[0]) => {
    setSelectedFoods((prev) => {
      const existing = prev.find((f) => f.id === food.id);
      if (existing) {
        return prev.map((f) =>
          f.id === food.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (id: string, quantity: number) => {
    setSelectedFoods((prev) =>
      prev.map((food) =>
        food.id === id ? { ...food, quantity: Math.max(0.1, quantity) } : food
      )
    );
  };

  // Xóa món ăn
  const removeFood = (id: string) => {
    setSelectedFoods((prev) => prev.filter((f) => f.id !== id));
  };

  // Tính tổng dinh dưỡng
  const getTotalNutrition = () => {
    return selectedFoods.reduce(
      (total, food) => ({
        calories: total.calories + food.calories * food.quantity,
        protein: total.protein + food.protein * food.quantity,
        carbs: total.carbs + food.carbs * food.quantity,
        fat: total.fat + food.fat * food.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
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

  return (
    <div className="space-y-6">
      {/* Meal Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Ghi nhận bữa ăn
          </CardTitle>
          <CardDescription>Chọn loại bữa ăn phù hợp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mealTypes.map((meal) => (
              <motion.div
                key={meal.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`cursor-pointer h-24 rounded-xl shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden transition ${
                    selectedMeal === meal.value
                      ? "ring-2 ring-blue-500"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedMeal(meal.value)}
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
        </CardContent>
      </Card>

      {/* Food Search */}
      <Card>
        <CardHeader>
          <CardTitle>Chọn thực phẩm</CardTitle>
          <CardDescription>Tìm kiếm hoặc thêm nhanh vào bữa ăn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm thực phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            />
          </div>

          <div className="grid gap-3 max-h-72 overflow-y-auto">
            <AnimatePresence>
              {filteredFoods.map((food) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-3 rounded-lg border bg-white hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{food.name}</h4>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs">
                      <Badge className="bg-green-100 text-blue-700">
                        {food.calories} cal
                      </Badge>
                      <Badge variant="outline">P: {food.protein}g</Badge>
                      <Badge variant="outline">C: {food.carbs}g</Badge>
                      <Badge variant="outline">F: {food.fat}g</Badge>
                      <Badge variant="secondary">{food.serving}</Badge>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="rounded-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => addFood(food)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Selected Foods */}
      <AnimatePresence>
        {selectedFoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🥗 Thực phẩm đã chọn
                </CardTitle>
                <CardDescription>
                  {mealTypes.find((m) => m.value === selectedMeal)?.label} -{" "}
                  {new Date().toLocaleDateString("vi-VN")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Selected Foods */}
                <AnimatePresence>
                  {selectedFoods.map((food) => (
                    <motion.div
                      key={food.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="flex items-center justify-between bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition"
                    >
                      {/* Food info */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">{food.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs">
                          <Badge className="bg-green-100 text-blue-700">
                            {Math.round(food.calories * food.quantity)} cal
                          </Badge>
                          <Badge variant="outline">
                            P: {Math.round(food.protein * food.quantity)}g
                          </Badge>
                          <Badge variant="outline">
                            C: {Math.round(food.carbs * food.quantity)}g
                          </Badge>
                          <Badge variant="outline">
                            F: {Math.round(food.fat * food.quantity)}g
                          </Badge>
                        </div>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(food.id, food.quantity - 0.5)
                            }
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={food.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                food.id,
                                Number.parseFloat(e.target.value) || 0.1
                              )
                            }
                            className="w-16 text-center border-none focus:ring-0"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(food.id, food.quantity + 0.5)
                            }
                          >
                            +
                          </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {food.serving}
                        </span>

                        {/* Remove button */}
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeFood(food.id)}
                          className="rounded-full"
                        >
                          ×
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Total Nutrition */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow-inner">
                  <h4 className="font-semibold mb-3 text-gray-800">
                    Tổng dinh dưỡng
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-xl text-emerald-600">
                        {Math.round(getTotalNutrition().calories)}
                      </div>
                      <div className="text-muted-foreground">Calo</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl text-blue-600">
                        {Math.round(getTotalNutrition().protein)}g
                      </div>
                      <div className="text-muted-foreground">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl text-orange-600">
                        {Math.round(getTotalNutrition().carbs)}g
                      </div>
                      <div className="text-muted-foreground">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl text-pink-600">
                        {Math.round(getTotalNutrition().fat)}g
                      </div>
                      <div className="text-muted-foreground">Fat</div>
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-500 hover:opacity-90 transition">
                    <Clock className="h-5 w-5 mr-2" />
                    Lưu bữa ăn
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
