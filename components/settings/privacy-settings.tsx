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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Shield, Eye, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function PrivacySettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    showProgress: true,
    showWorkouts: true,
    allowMessages: true,
    shareAchievements: true,
    dataCollection: true,
    analyticsTracking: false,
  });

  const handleSave = () => {
    toast({
      title: "Đã lưu thành công",
      description: "Cài đặt quyền riêng tư đã được cập nhật.",
    });
  };

  const sectionMotion = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          <Shield className="h-6 w-6 text-blue-400" />
          Quyền riêng tư & Bảo mật
        </CardTitle>
        <CardDescription>
          Quản lý quyền riêng tư và cách chia sẻ thông tin của bạn
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Profile Visibility */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-semibold">Hiển thị hồ sơ</h3>
          </div>
          <div className="space-y-2">
            <Label>Ai có thể xem hồ sơ của bạn?</Label>
            <Select
              value={settings.profileVisibility}
              onValueChange={(value) =>
                setSettings({ ...settings, profileVisibility: value })
              }
            >
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Công khai</SelectItem>
                <SelectItem value="friends">Chỉ bạn bè</SelectItem>
                <SelectItem value="private">Riêng tư</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Data Sharing */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold">Chia sẻ dữ liệu</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Hiển thị tiến độ tập luyện",
                value: settings.showProgress,
                setter: "showProgress",
                desc: "Cho phép người khác xem tiến độ tập luyện của bạn",
              },
              {
                label: "Hiển thị bài tập",
                value: settings.showWorkouts,
                setter: "showWorkouts",
                desc: "Cho phép người khác xem các bài tập bạn đã thực hiện",
              },
              {
                label: "Chia sẻ thành tích",
                value: settings.shareAchievements,
                setter: "shareAchievements",
                desc: "Tự động chia sẻ thành tích với cộng đồng",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.setter}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div className="space-y-0.5">
                  <Label>{item.label}</Label>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={item.value}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, [item.setter]: checked })
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Communication */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold">Giao tiếp</h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
            <div className="space-y-0.5">
              <Label>Cho phép nhận tin nhắn</Label>
              <p className="text-sm text-muted-foreground">
                Người dùng khác có thể gửi tin nhắn cho bạn
              </p>
            </div>
            <Switch
              checked={settings.allowMessages}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, allowMessages: checked })
              }
            />
          </div>
        </motion.div>

        {/* Data Collection */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold">Thu thập dữ liệu</h3>
          {[
            {
              label: "Thu thập dữ liệu sử dụng",
              value: settings.dataCollection,
              setter: "dataCollection",
              desc: "Giúp cải thiện trải nghiệm ứng dụng",
            },
            {
              label: "Theo dõi phân tích",
              value: settings.analyticsTracking,
              setter: "analyticsTracking",
              desc: "Cho phép theo dõi để phân tích và cải thiện dịch vụ",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.setter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5"
            >
              <div className="space-y-0.5">
                <Label>{item.label}</Label>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={item.value}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, [item.setter]: checked })
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleSave}
            className="w-full md:w-auto bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg"
          >
            <Save className="h-4 w-4 mr-2" />
            Lưu cài đặt
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
