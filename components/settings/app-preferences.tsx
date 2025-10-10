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
import { Save, Palette, Globe, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function AppPreferences() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    theme: "system",
    language: "vi",
    units: "metric",
    autoSync: true,
    offlineMode: false,
    animations: true,
    soundEffects: true,
    hapticFeedback: true,
  });

  const handleSave = () => {
    toast({
      title: "Đã lưu thành công",
      description: "Tùy chọn ứng dụng đã được cập nhật.",
    });
  };

  const sectionMotion = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const itemMotion = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
          <Zap className="h-6 w-6 text-blue-400" />
          Tùy chọn ứng dụng
        </CardTitle>
        <CardDescription>
          Cá nhân hóa trải nghiệm sử dụng ứng dụng
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Appearance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-semibold">Giao diện</h3>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemMotion}
            className="flex flex-col gap-3 p-3 rounded-lg"
          >
            <div className="space-y-2">
              <Label>Chủ đề</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) =>
                  setSettings({ ...settings, theme: value })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Sáng</SelectItem>
                  <SelectItem value="dark">Tối</SelectItem>
                  <SelectItem value="system">Theo hệ thống</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiệu ứng chuyển động</Label>
                <p className="text-sm text-muted-foreground">
                  Bật/tắt các hiệu ứng chuyển động trong ứng dụng
                </p>
              </div>
              <Switch
                checked={settings.animations}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, animations: checked })
                }
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Language & Region */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold">Ngôn ngữ & Khu vực</h3>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemMotion}
            className="flex flex-col gap-3 p-3 rounded-lg"
          >
            <div className="space-y-2">
              <Label>Ngôn ngữ</Label>
              <Select
                value={settings.language}
                onValueChange={(value) =>
                  setSettings({ ...settings, language: value })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Đơn vị đo lường</Label>
              <Select
                value={settings.units}
                onValueChange={(value) =>
                  setSettings({ ...settings, units: value })
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Hệ mét (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Hệ Anh (lbs, ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </motion.div>

        {/* Data & Sync */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold">Dữ liệu & Đồng bộ</h3>
          {[
            {
              label: "Tự động đồng bộ",
              value: settings.autoSync,
              setter: "autoSync",
              desc: "Tự động đồng bộ dữ liệu khi có kết nối internet",
            },
            {
              label: "Chế độ ngoại tuyến",
              value: settings.offlineMode,
              setter: "offlineMode",
              desc: "Cho phép sử dụng ứng dụng khi không có internet",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.setter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-center justify-between p-3 rounded-lg"
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

        {/* Audio & Haptics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionMotion}
          className="space-y-3"
        >
          <h3 className="text-lg font-semibold">Âm thanh & Rung</h3>
          {[
            {
              label: "Hiệu ứng âm thanh",
              value: settings.soundEffects,
              setter: "soundEffects",
              desc: "Phát âm thanh khi hoàn thành bài tập",
            },
            {
              label: "Phản hồi rung",
              value: settings.hapticFeedback,
              setter: "hapticFeedback",
              desc: "Rung khi có thông báo hoặc hoàn thành mục tiêu",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.setter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="flex items-center justify-between p-3 rounded-lg"
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
            Lưu tùy chọn
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
