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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Save, Clock, Target } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  notes?: string;
}

export function CustomWorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    sets: 3,
    reps: 12,
    restTime: 60,
    notes: "",
  });

  const addExercise = () => {
    if (currentExercise.name) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        ...currentExercise,
      };
      setExercises([...exercises, newExercise]);
      setCurrentExercise({
        name: "",
        sets: 3,
        reps: 12,
        restTime: 60,
        notes: "",
      });
    }
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const calculateTotalTime = () => {
    return exercises.reduce((total, exercise) => {
      // Estimate 2 minutes per set + rest time
      return (
        total +
        exercise.sets * 2 +
        (exercise.sets - 1) * (exercise.restTime / 60)
      );
    }, 0);
  };

  const saveWorkout = () => {
    if (workoutName && exercises.length > 0) {
      console.log("Saving workout:", {
        workoutName,
        workoutDescription,
        exercises,
      });
      // Here you would save to your backend
    }
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Workout Info */}
      <Card className="shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Tạo bài tập mới
          </CardTitle>
          <CardDescription>
            Thiết kế bài tập cá nhân phù hợp với mục tiêu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workoutName">Tên bài tập</Label>
            <Input
              id="workoutName"
              placeholder="Ví dụ: Tập ngực và vai"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workoutDescription">Mô tả (tùy chọn)</Label>
            <Textarea
              id="workoutDescription"
              placeholder="Mô tả ngắn về bài tập này..."
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
              className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Exercise */}
      <Card className="shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Thêm bài tập
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exerciseName">Tên bài tập</Label>
            <Select
              value={currentExercise.name}
              onValueChange={(value) =>
                setCurrentExercise({ ...currentExercise, name: value })
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Chọn bài tập" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="push-ups">Push-ups</SelectItem>
                <SelectItem value="squats">Squats</SelectItem>
                <SelectItem value="plank">Plank</SelectItem>
                <SelectItem value="burpees">Burpees</SelectItem>
                <SelectItem value="lunges">Lunges</SelectItem>
                <SelectItem value="mountain-climbers">
                  Mountain Climbers
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sets">Sets</Label>
              <Input
                id="sets"
                type="number"
                min="1"
                value={currentExercise.sets}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    sets: Number.parseInt(e.target.value) || 1,
                  })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reps">Reps</Label>
              <Input
                id="reps"
                type="number"
                min="1"
                value={currentExercise.reps}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    reps: Number.parseInt(e.target.value) || 1,
                  })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restTime">Nghỉ (giây)</Label>
              <Input
                id="restTime"
                type="number"
                min="0"
                value={currentExercise.restTime}
                onChange={(e) =>
                  setCurrentExercise({
                    ...currentExercise,
                    restTime: Number.parseInt(e.target.value) || 0,
                  })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
            <Input
              id="notes"
              placeholder="Ghi chú về kỹ thuật, trọng lượng..."
              value={currentExercise.notes}
              onChange={(e) =>
                setCurrentExercise({
                  ...currentExercise,
                  notes: e.target.value,
                })
              }
              className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            />
          </div>

          <Button
            onClick={addExercise}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm bài tập
          </Button>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <AnimatePresence>
        {exercises.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-xl border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      Danh sách bài tập ({exercises.length})
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Ước tính: {Math.round(calculateTotalTime())} phút
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {exercises.reduce(
                          (total, ex) => total + ex.sets,
                          0
                        )}{" "}
                        sets tổng
                      </span>
                    </CardDescription>
                  </div>
                  <Button
                    onClick={saveWorkout}
                    disabled={!workoutName || exercises.length === 0}
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:opacity-90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu bài tập
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {exercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition bg-white/50 dark:bg-gray-800/50">
                      <div className="flex-1">
                        <h4 className="font-medium capitalize">
                          {exercise.name}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{exercise.sets} sets</span>
                          <span>{exercise.reps} reps</span>
                          <span>{exercise.restTime}s nghỉ</span>
                        </div>
                        {exercise.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Ghi chú: {exercise.notes}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExercise(exercise.id)}
                        className="hover:bg-red-100 hover:text-red-600 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {index < exercises.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
