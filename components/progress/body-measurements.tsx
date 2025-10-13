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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Measurement {
  date: string;
  weight: number;
  bodyFat: number;
  muscle: number;
  chest: number;
  waist: number;
  hips: number;
  arms: number;
  thighs: number;
}

type MeasurementField = Exclude<keyof Measurement, "date">;

type MeasurementFormState = Record<MeasurementField, string>;

export function BodyMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>([
    {
      date: "2024-01-15",
      weight: 70.5,
      bodyFat: 18.2,
      muscle: 32.1,
      chest: 95,
      waist: 78,
      hips: 92,
      arms: 32,
      thighs: 58,
    },
    {
      date: "2024-01-08",
      weight: 71.2,
      bodyFat: 19.1,
      muscle: 31.8,
      chest: 94,
      waist: 79,
      hips: 93,
      arms: 31.5,
      thighs: 57.5,
    },
  ]);

  const measurementFields: MeasurementField[] = [
    "weight",
    "bodyFat",
    "muscle",
    "chest",
    "waist",
    "hips",
    "arms",
    "thighs",
  ];

  const emptyMeasurement: MeasurementFormState = {
    weight: "",
    bodyFat: "",
    muscle: "",
    chest: "",
    waist: "",
    hips: "",
    arms: "",
    thighs: "",
  };

  const [newMeasurement, setNewMeasurement] =
    useState<MeasurementFormState>({ ...emptyMeasurement });

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return "up";
    if (current < previous) return "down";
    return "same";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleAddMeasurement = () => {
    const measurement: Measurement = {
      date: new Date().toISOString().split("T")[0],
      weight: Number.parseFloat(newMeasurement.weight) || 0,
      bodyFat: Number.parseFloat(newMeasurement.bodyFat) || 0,
      muscle: Number.parseFloat(newMeasurement.muscle) || 0,
      chest: Number.parseFloat(newMeasurement.chest) || 0,
      waist: Number.parseFloat(newMeasurement.waist) || 0,
      hips: Number.parseFloat(newMeasurement.hips) || 0,
      arms: Number.parseFloat(newMeasurement.arms) || 0,
      thighs: Number.parseFloat(newMeasurement.thighs) || 0,
    };

    setMeasurements([measurement, ...measurements]);
    setNewMeasurement({ ...emptyMeasurement });
  };

  const latest = measurements[0];
  const previous = measurements[1];

  const highlights = [
    {
      title: "Cân nặng",
      value: `${latest.weight} kg`,
      color: "from-green-400 to-emerald-500",
      trend: getTrend(latest.weight, previous?.weight || 0),
    },
    {
      title: "Tỷ lệ mỡ",
      value: `${latest.bodyFat}%`,
      color: "from-blue-400 to-indigo-500",
      trend: getTrend(latest.bodyFat, previous?.bodyFat || 0),
    },
    {
      title: "Khối lượng cơ",
      value: `${latest.muscle} kg`,
      color: "from-purple-400 to-pink-500",
      trend: getTrend(latest.muscle, previous?.muscle || 0),
    },
    {
      title: "Vòng eo",
      value: `${latest.waist} cm`,
      color: "from-orange-400 to-red-500",
      trend: getTrend(latest.waist, previous?.waist || 0),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Highlights cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-[1.03]">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-25`}
              />
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {getTrendIcon(item.trend)}
                  {item.trend === "up"
                    ? "Tăng so với lần trước"
                    : item.trend === "down"
                    ? "Giảm so với lần trước"
                    : "Không đổi"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs for add/history */}
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/30 p-1 backdrop-blur-sm">
          <TabsTrigger
            value="add"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500
      data-[state=active]:text-white data-[state=active]:shadow-md
      hover:scale-[1.05]"
          >
            Thêm đo lường
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all
      data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500
      data-[state=active]:text-white data-[state=active]:shadow-md
      hover:scale-[1.05]"
          >
            Lịch sử
          </TabsTrigger>
        </TabsList>

        {/* Add form */}
        <TabsContent value="add" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Thêm chỉ số mới</CardTitle>
                <CardDescription>
                  Nhập các chỉ số cơ thể hiện tại của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {measurementFields.map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{field}</Label>
                      <Input
                        className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                        id={field}
                        type="number"
                        step="0.1"
                        value={newMeasurement[field]}
                        onChange={(e) =>
                          setNewMeasurement({
                            ...newMeasurement,
                            [field]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleAddMeasurement}
                  className="w-full rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                >
                  Lưu chỉ số
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* History list */}
        <TabsContent value="history" className="space-y-4">
          <AnimatePresence>
            {measurements.map((measurement, index) => (
              <motion.div
                key={measurement.date}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden rounded-xl shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">
                      {new Date(measurement.date).toLocaleDateString("vi-VN")}
                    </CardTitle>
                    {index === 0 && <Badge variant="secondary">Mới nhất</Badge>}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        Cân nặng:{" "}
                        <span className="font-semibold">
                          {measurement.weight} kg
                        </span>
                      </div>
                      <div>
                        Tỷ lệ mỡ:{" "}
                        <span className="font-semibold">
                          {measurement.bodyFat}%
                        </span>
                      </div>
                      <div>
                        Cơ:{" "}
                        <span className="font-semibold">
                          {measurement.muscle} kg
                        </span>
                      </div>
                      <div>
                        Ngực:{" "}
                        <span className="font-semibold">
                          {measurement.chest} cm
                        </span>
                      </div>
                      <div>
                        Eo:{" "}
                        <span className="font-semibold">
                          {measurement.waist} cm
                        </span>
                      </div>
                      <div>
                        Mông:{" "}
                        <span className="font-semibold">
                          {measurement.hips} cm
                        </span>
                      </div>
                      <div>
                        Tay:{" "}
                        <span className="font-semibold">
                          {measurement.arms} cm
                        </span>
                      </div>
                      <div>
                        Đùi:{" "}
                        <span className="font-semibold">
                          {measurement.thighs} cm
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
