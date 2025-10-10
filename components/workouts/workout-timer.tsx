"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

interface WorkoutTimerProps {
  exerciseName: string;
  duration: number; // seconds
  restDuration: number; // seconds
  onComplete?: () => void;
}

export function WorkoutTimer({
  exerciseName,
  duration,
  restDuration,
  onComplete,
}: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"exercise" | "rest">(
    "exercise"
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      if (currentPhase === "exercise" && restDuration > 0) {
        setCurrentPhase("rest");
        setTimeLeft(restDuration);
      } else {
        setIsRunning(false);
        onComplete?.();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentPhase, restDuration, onComplete]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  const totalDuration = currentPhase === "exercise" ? duration : restDuration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentPhase === "exercise" ? duration : restDuration);
  };
  const handleSkip = () => {
    if (currentPhase === "exercise" && restDuration > 0) {
      setCurrentPhase("rest");
      setTimeLeft(restDuration);
    } else {
      onComplete?.();
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-lg p-6 space-y-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title */}
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentPhase}
            className={`text-2xl font-bold ${
              currentPhase === "exercise" ? "text-blue-500" : "text-orange-500"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPhase === "exercise" ? exerciseName : "Nghỉ ngơi"}
          </motion.h2>
        </AnimatePresence>
        <p className="text-muted-foreground">
          {currentPhase === "exercise" ? "Đang tập luyện..." : "Thời gian nghỉ"}
        </p>
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center items-center">
        <motion.div
          className="relative w-48 h-48 flex items-center justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="90"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="transparent"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="90"
              stroke={currentPhase === "exercise" ? "#224bc5" : "#f97316"}
              strokeWidth="12"
              strokeLinecap="round"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <motion.div
            key={timeLeft}
            className="text-5xl font-bold font-mono"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(timeLeft)}
          </motion.div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Play className="mr-2 h-5 w-5" /> Bắt đầu
          </Button>
        ) : (
          <Button onClick={handlePause} size="lg" variant="secondary">
            <Pause className="mr-2 h-5 w-5" /> Tạm dừng
          </Button>
        )}
        <Button onClick={handleReset} size="lg" variant="outline">
          <RotateCcw className="mr-2 h-5 w-5" /> Đặt lại
        </Button>
        <Button onClick={handleSkip} size="lg" variant="outline">
          <SkipForward className="mr-2 h-5 w-5" /> Bỏ qua
        </Button>
      </div>
    </motion.div>
  );
}
