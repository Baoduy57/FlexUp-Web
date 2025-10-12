"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

interface WorkoutTimerProps {
  exerciseName: string;
  completed?: boolean;
  durationSeconds?: number;
  disabled?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  onReset?: () => void;
}

export function WorkoutTimer({
  exerciseName,
  completed = false,
  durationSeconds = 60,
  disabled = false,
  onComplete,
  onSkip,
  onReset,
}: WorkoutTimerProps) {
  const initialDuration = Math.max(durationSeconds, 1);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);

  // Reset timer whenever exercise changes or duration is updated
  useEffect(() => {
    setTimeLeft(initialDuration);
    setIsRunning(false);
  }, [initialDuration, exerciseName]);

  // Stop timer if exercise is marked as completed externally
  useEffect(() => {
    if (completed) {
      setIsRunning(false);
      setTimeLeft(0);
    }
  }, [completed]);

  useEffect(() => {
    if (completed || disabled || !isRunning) {
      return;
    }

    if (timeLeft <= 0) {
      setIsRunning(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, completed, onComplete]);

  const formatTime = (seconds: number) => {
    const safeSeconds = Math.max(seconds, 0);
    return `${String(Math.floor(safeSeconds / 60)).padStart(2, "0")}:${String(
      safeSeconds % 60
    ).padStart(2, "0")}`;
  };

  const progress = completed
    ? 100
    : ((initialDuration - timeLeft) / initialDuration) * 100;

  const handleStart = () => {
    if (completed || disabled) return;
    if (timeLeft <= 0) {
      setTimeLeft(initialDuration);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    if (completed || disabled) return;
    setIsRunning(false);
    setTimeLeft(initialDuration);
    onReset?.();
  };

  const handleSkip = () => {
    if (completed || disabled) return;
    setIsRunning(false);
    setTimeLeft(0);
    onSkip?.();
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-lg p-6 space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-blue-500">{exerciseName}</h2>
        <p className="text-muted-foreground">
          {completed
            ? "Đã hoàn thành bài tập"
            : `Đếm ngược ${initialDuration} giây`}
        </p>
      </div>

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
              stroke="#224bc5"
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

      <div className="flex justify-center gap-3">
        {completed ? (
          <Button size="lg" variant="secondary" disabled>
            Đã hoàn thành
          </Button>
        ) : !isRunning ? (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={disabled}
          >
            <Play className="mr-2 h-5 w-5" /> Bắt đầu
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            size="lg"
            variant="secondary"
            disabled={disabled}
          >
            <Pause className="mr-2 h-5 w-5" /> Tạm dừng
          </Button>
        )}
        <Button
          onClick={handleReset}
          size="lg"
          variant="outline"
          disabled={completed || disabled}
        >
          <RotateCcw className="mr-2 h-5 w-5" /> Đặt lại
        </Button>
        <Button
          onClick={handleSkip}
          size="lg"
          variant="outline"
          disabled={completed || disabled}
        >
          <SkipForward className="mr-2 h-5 w-5" /> Bỏ qua
        </Button>
      </div>
    </motion.div>
  );
}
