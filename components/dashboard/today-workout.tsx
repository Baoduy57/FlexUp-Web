import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, Clock, Dumbbell } from "lucide-react";

export function TodayWorkout() {
  const exercises = [
    { name: "Push-ups", sets: "3x12", completed: true },
    { name: "Squats", sets: "3x15", completed: true },
    { name: "Plank", sets: "3x30s", completed: false },
    { name: "Burpees", sets: "3x8", completed: false },
  ];

  const completedCount = exercises.filter((ex) => ex.completed).length;
  const progressPercentage = (completedCount / exercises.length) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-t-lg" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-blue-600" />
              Bài tập hôm nay
            </CardTitle>
            <CardDescription>Tập trung vào cơ ngực và chân</CardDescription>
          </div>
          <Badge variant="default" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            45 phút
          </Badge>
        </div>
        <div className="mt-4 space-y-2">
          <Progress value={progressPercentage} className="w-full h-2" />
          <p className="text-sm text-muted-foreground">
            {completedCount}/{exercises.length} bài tập hoàn thành
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition"
          >
            <div className="flex items-center gap-3">
              {exercise.completed ? (
                <CheckCircle className="h-5 w-5 text-blue-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
              )}
              <div>
                <p className="font-medium">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">{exercise.sets}</p>
              </div>
            </div>
            {!exercise.completed && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              >
                <Play className="h-4 w-4 mr-1" />
                Bắt đầu
              </Button>
            )}
          </div>
        ))}

        <Button
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
          size="lg"
        >
          Tiếp tục tập luyện
        </Button>
      </CardContent>
    </Card>
  );
}
