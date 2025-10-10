"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Target, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

const weightData = [
  { date: "01/01", weight: 72.5, target: 70 },
  { date: "01/08", weight: 71.8, target: 70 },
  { date: "01/15", weight: 71.2, target: 70 },
  { date: "01/22", weight: 70.8, target: 70 },
  { date: "01/29", weight: 70.5, target: 70 },
];

const workoutData = [
  { week: "Tuần 1", completed: 4, planned: 5 },
  { week: "Tuần 2", completed: 5, planned: 5 },
  { week: "Tuần 3", completed: 3, planned: 5 },
  { week: "Tuần 4", completed: 5, planned: 5 },
];

const bodyCompositionData = [
  { name: "Cơ bắp", value: 45, color: "#10b981" },
  { name: "Mỡ", value: 18, color: "#f59e0b" },
  { name: "Nước", value: 32, color: "#3b82f6" },
  { name: "Khác", value: 5, color: "#6b7280" },
];

const strengthData = [
  { exercise: "Bench Press", current: 80, previous: 75, target: 90 },
  { exercise: "Squat", current: 100, previous: 95, target: 110 },
  { exercise: "Deadlift", current: 120, previous: 115, target: 130 },
  { exercise: "Pull-up", current: 12, previous: 10, target: 15 },
];

export function ProgressCharts() {
  const stats = [
    {
      title: "Giảm cân",
      value: "-2.0 kg",
      sub: "Trong tháng này",
      icon: TrendingUp,
      color: "from-green-400 to-emerald-500",
    },
    {
      title: "Mục tiêu",
      value: "85%",
      sub: "Hoàn thành mục tiêu",
      icon: Target,
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Tập luyện",
      value: "17/20",
      sub: "Buổi tập trong tháng",
      icon: Calendar,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Thành tích",
      value: "12",
      sub: "Huy hiệu đạt được",
      icon: Award,
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
              {/* Gradient Blur Background */}
              <div
                className={`absolute inset-0 opacity-20 bg-gradient-to-br ${stat.color}`}
              />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                <div
                  className={`p-2 rounded-full bg-gradient-to-br ${stat.color} text-white shadow-md`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-extrabold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs với Charts */}
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-xl bg-white/10 backdrop-blur-md p-1">
          <TabsTrigger
            value="weight"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all"
          >
            Cân nặng
          </TabsTrigger>
          <TabsTrigger
            value="workout"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all"
          >
            Tập luyện
          </TabsTrigger>
          <TabsTrigger
            value="body"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all"
          >
            Thành phần cơ thể
          </TabsTrigger>
          <TabsTrigger
            value="strength"
            className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all"
          >
            Sức mạnh
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weight">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden backdrop-blur-xl bg-white/60 border border-white/20 shadow">
              <CardHeader>
                <CardTitle>Biến đổi cân nặng</CardTitle>
                <CardDescription>
                  Theo dõi tiến độ giảm cân theo thời gian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Cân nặng"
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                      name="Mục tiêu"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="workout">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden backdrop-blur-xl bg-white/60 border border-white/20 shadow">
              <CardHeader>
                <CardTitle>Tần suất tập luyện</CardTitle>
                <CardDescription>
                  So sánh số buổi tập thực tế với kế hoạch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#e5e7eb" name="Kế hoạch" />
                    <Bar dataKey="completed" fill="#10b981" name="Hoàn thành" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="body">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden backdrop-blur-xl bg-white/60 border border-white/20 shadow">
              <CardHeader>
                <CardTitle>Thành phần cơ thể</CardTitle>
                <CardDescription>
                  Phân tích tỷ lệ các thành phần trong cơ thể
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={bodyCompositionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {bodyCompositionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {bodyCompositionData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="strength">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden backdrop-blur-xl bg-white/60 border border-white/20 shadow">
              <CardHeader>
                <CardTitle>Tiến độ sức mạnh</CardTitle>
                <CardDescription>
                  Theo dõi sự cải thiện trong các bài tập chính
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strengthData.map((exercise, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{exercise.exercise}</span>
                        <span className="text-sm text-muted-foreground">
                          {exercise.current} / {exercise.target}{" "}
                          {exercise.exercise === "Pull-up" ? "reps" : "kg"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (exercise.current / exercise.target) * 100
                            }%`,
                          }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Trước: {exercise.previous}</span>
                        <span>+{exercise.current - exercise.previous}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
