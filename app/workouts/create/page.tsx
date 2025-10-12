"use client";

import { CustomWorkoutBuilder } from "@/components/workouts/custom-workout-builder";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PremiumFeatureGate } from "@/components/premium/premium-feature-gate";

export default function CreateWorkoutPage() {
  return (
    <PremiumFeatureGate featureName="create-workout">
      <div className="min-h-screen bg-background">
        <main className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <motion.div
              className="pt-12 md:pt-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <Link href="/workouts">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex items-center gap-2 rounded-lg border border-transparent hover:border-primary/40 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Quay lại</span>
                    </Button>
                  </motion.div>
                </Link>

                <div>
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    Tạo bài tập mới
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Thiết kế bài tập cá nhân phù hợp với mục tiêu của bạn
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Custom Workout Builder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl shadow-lg border border-border bg-card p-6 md:p-8"
            >
              <CustomWorkoutBuilder />
            </motion.div>
          </div>
        </main>
      </div>
    </PremiumFeatureGate>
  );
}
