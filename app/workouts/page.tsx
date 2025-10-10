"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { WorkoutCard } from "@/components/workouts/workout-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { workoutPrograms } from "@/data/workouts";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkoutsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20 transition-colors">
      <Sidebar />
      <main className="md:ml-64 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="pt-12 md:pt-0 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Chương trình tập luyện
              </h1>
              <p className="text-muted-foreground mt-2">
                Khám phá các bài tập phù hợp với mục tiêu và cấp độ của bạn
              </p>
            </motion.div>
            <Link href="/workouts/create">
              <Button className="rounded-xl shadow-md hover:shadow-lg transition">
                <Plus className="h-4 w-4 mr-2" />
                Tạo bài tập
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài tập..."
                className="pl-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-xl">
                <SelectValue placeholder="Cấp độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="easy">Dễ</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="hard">Khó</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48 rounded-xl">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="muscle">Tăng cơ</SelectItem>
                <SelectItem value="cardio">Giảm mỡ</SelectItem>
                <SelectItem value="flexibility">Thư giãn</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Workout Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex w-full justify-center gap-4 rounded-2xl bg-transparent p-1">
              <TabsTrigger
                value="all"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all 
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500
        data-[state=active]:text-white data-[state=active]:shadow-md
        hover:scale-[1.05]"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                value="recommended"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500
        data-[state=active]:text-white data-[state=active]:shadow-md
        hover:scale-[1.05]"
              >
                Đề xuất
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500
        data-[state=active]:text-white data-[state=active]:shadow-md
        hover:scale-[1.05]"
              >
                Yêu thích
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="rounded-xl px-6 py-2 text-sm font-semibold transition-all
        data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-500
        data-[state=active]:text-white data-[state=active]:shadow-md
        hover:scale-[1.05]"
              >
                Tự tạo
              </TabsTrigger>
            </TabsList>

            {/* All */}
            <TabsContent value="all" className="mt-6">
              <AnimatePresence>
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.08 },
                    },
                  }}
                >
                  {workoutPrograms.map((workout, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <WorkoutCard {...workout} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Recommended */}
            <TabsContent value="recommended" className="mt-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {workoutPrograms.slice(0, 3).map((workout, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WorkoutCard {...workout} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Favorites */}
            <TabsContent value="favorites" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  Chưa có bài tập yêu thích nào
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Nhấn vào biểu tượng bookmark để lưu bài tập yêu thích
                </p>
              </motion.div>
            </TabsContent>

            {/* Custom */}
            <TabsContent value="custom" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  Chưa có bài tập tự tạo nào
                </p>
                <Link href="/workouts/create">
                  <Button className="mt-4 rounded-xl shadow-md hover:shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo bài tập đầu tiên
                  </Button>
                </Link>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
