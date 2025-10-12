"use client";

import { notFound } from "next/navigation";
import { getAllMeals } from "@/data/meal-plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Flame, ChefHat } from "lucide-react";

interface Props {
  params: { id: string };
}

export default function MealDetailPage({ params }: Props) {
  // Get all meals and find the one with matching ID
  const allMeals = getAllMeals();
  const meal = allMeals.find((m: any) => m.id === params.id);
  
  if (!meal) return notFound();

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

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">{meal.name}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{meal.description}</p>
      </div>

      {/* Main Image */}
      <Card className="mb-6 overflow-hidden">
        <div className="h-80 overflow-hidden">
          <img 
            src={meal.image} 
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Card>

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{meal.prepTime}</div>
            <p className="text-xs text-muted-foreground">phút</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{meal.servings}</div>
            <p className="text-xs text-muted-foreground">người</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500 fill-yellow-500" />
            <div className="text-2xl font-bold">{meal.rating}</div>
            <p className="text-xs text-muted-foreground">đánh giá</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mx-auto mb-2">
              <Badge className={difficultyColors[meal.difficulty]}>
                {difficultyLabels[meal.difficulty]}
              </Badge>
            </div>
            <div className="text-sm font-medium">Độ khó</div>
          </CardContent>
        </Card>
      </div>

      {/* Nutrition Info */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <CardTitle>Thông tin dinh dưỡng</CardTitle>
          </div>
          <CardDescription>Giá trị dinh dưỡng trên {meal.servings} khẩu phần</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-orange-50">
              <div className="text-3xl font-bold text-orange-600">{meal.calories}</div>
              <p className="text-sm text-muted-foreground mt-1">Calories (kcal)</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-3xl font-bold text-blue-600">{meal.protein}g</div>
              <p className="text-sm text-muted-foreground mt-1">Protein</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-3xl font-bold text-green-600">{meal.carbs}g</div>
              <p className="text-sm text-muted-foreground mt-1">Carbs</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-50">
              <div className="text-3xl font-bold text-yellow-600">{meal.fat}g</div>
              <p className="text-sm text-muted-foreground mt-1">Fat</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Nguyên liệu</CardTitle>
            <CardDescription>Chuẩn bị đầy đủ trước khi nấu</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {meal.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Cách làm</CardTitle>
            <CardDescription>Làm theo các bước dưới đây</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {meal.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p>{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="mt-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg">💡 Mẹo nấu ăn</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Chuẩn bị tất cả nguyên liệu trước khi bắt đầu nấu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Đọc kỹ toàn bộ công thức trước khi thực hiện</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Có thể điều chỉnh gia vị theo khẩu vị cá nhân</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
