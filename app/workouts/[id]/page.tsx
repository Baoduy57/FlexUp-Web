"use client";

import { WorkoutTimer } from "@/components/workouts/workout-timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { workoutPrograms } from "@/data/workouts";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface WorkoutDetailPageProps {
  params: { id: string };
}

export default function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const workout = workoutPrograms.find((w) => w.id === params.id);

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy bài tập</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Header */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/workouts">
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center gap-2 rounded-lg border border-transparent hover:border-primary/40 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {workout.title}
              </h1>
              <p className="text-muted-foreground mt-2">
                {workout.description}
              </p>
            </div>
          </motion.div>

          {/* Exercises */}
          <div className="space-y-8">
            {workout.exercises.map((ex, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden shadow-lg rounded-xl border border-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {ex.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Video */}
                    <motion.video
                      controls
                      autoPlay
                      loop
                      className="w-full rounded-xl shadow-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <source src={ex.video} type="video/mp4" />
                    </motion.video>

                    {/* Description */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Mô tả</h3>
                      <p className="text-muted-foreground">{ex.description}</p>
                    </div>

                    <Separator />

                    {/* Steps */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">
                        Các bước thực hiện
                      </h3>
                      <ul className="space-y-2">
                        {ex.steps.map((step, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timer */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <WorkoutTimer
                        exerciseName={ex.name}
                        duration={ex.duration}
                        restDuration={ex.rest}
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
