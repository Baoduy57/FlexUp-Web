"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    workoutReminders: true,
    waterReminders: true,
    progressUpdates: true,
    communityUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
    workoutReminderTime: "08:00",
    waterReminderInterval: "60",
  });

  const handleSave = () => {
    toast({
      title: "Đã lưu thành công",
      description: "Cài đặt thông báo đã được cập nhật.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl shadow-lg p-6"
    >
      <Card className="bg-transparent shadow-none border-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Cài đặt thông báo
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Quản lý các loại thông báo và nhắc nhở
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Workout Reminders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Nhắc nhở tập luyện</h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition hover:bg-white/20">
              <div className="space-y-0.5">
                <Label>Nhắc nhở tập luyện hàng ngày</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo nhắc nhở về lịch tập luyện
                </p>
              </div>
              <Switch
                checked={settings.workoutReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, workoutReminders: checked })
                }
              />
            </div>
            {settings.workoutReminders && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="ml-4 space-y-2 w-32"
              >
                <Label>Thời gian nhắc nhở</Label>
                <Select
                  value={settings.workoutReminderTime}
                  onValueChange={(value) =>
                    setSettings({ ...settings, workoutReminderTime: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "06:00",
                      "07:00",
                      "08:00",
                      "09:00",
                      "18:00",
                      "19:00",
                      "20:00",
                    ].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </motion.div>

          {/* Water Reminders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Nhắc nhở uống nước</h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition hover:bg-white/20">
              <div className="space-y-0.5">
                <Label>Nhắc nhở uống nước</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo nhắc nhở uống nước định kỳ
                </p>
              </div>
              <Switch
                checked={settings.waterReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, waterReminders: checked })
                }
              />
            </div>
            {settings.waterReminders && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="ml-4 space-y-2 w-32"
              >
                <Label>Khoảng thời gian (phút)</Label>
                <Select
                  value={settings.waterReminderInterval}
                  onValueChange={(value) =>
                    setSettings({ ...settings, waterReminderInterval: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["30", "60", "90", "120"].map((time) => (
                      <SelectItem key={time} value={time}>
                        {time === "60"
                          ? "1 giờ"
                          : time === "90"
                          ? "1.5 giờ"
                          : time === "120"
                          ? "2 giờ"
                          : `${time} phút`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </motion.div>

          {/* Other Notifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Thông báo khác</h3>
            <div className="space-y-2">
              {[
                { label: "Cập nhật tiến độ", key: "progressUpdates" },
                { label: "Cập nhật cộng đồng", key: "communityUpdates" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition hover:bg-white/20"
                >
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                  </div>
                  <Switch
                    checked={
                      settings[item.key as keyof typeof settings] as boolean
                    }
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Notification Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Phương thức thông báo</h3>
            <div className="space-y-2">
              {[
                { label: "Thông báo qua Email", key: "emailNotifications" },
                { label: "Thông báo đẩy", key: "pushNotifications" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 transition hover:bg-white/20"
                >
                  <Label>{item.label}</Label>
                  <Switch
                    checked={
                      settings[item.key as keyof typeof settings] as boolean
                    }
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button
              onClick={handleSave}
              className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:from-indigo-600 hover:to-purple-600 transition"
            >
              <Save className="h-4 w-4" />
              Lưu cài đặt
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
