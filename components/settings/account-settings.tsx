"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function AccountSettings() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "Thái Bảo Duy",
    email: "thaibaoduy.5724@email.com",
    phone: "0123456789",
    age: "25",
    gender: "male",
    height: "170",
    weight: "65",
  });

  const handleSave = () => {
    toast({
      title: "Đã lưu thành công",
      description: "Thông tin tài khoản đã được cập nhật.",
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
            Thông tin tài khoản
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-6"
          >
            <Avatar className="h-24 w-24 shadow-lg border border-white/20">
              <AvatarImage src="/user-avatar.jpg" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-indigo-50 transition"
            >
              <Camera className="h-4 w-4" />
              Thay đổi ảnh
            </Button>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Tuổi</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Chiều cao (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Cân nặng (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              onClick={handleSave}
              className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:from-indigo-600 hover:to-purple-600 transition"
            >
              <Save className="h-4 w-4" />
              Lưu thay đổi
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
