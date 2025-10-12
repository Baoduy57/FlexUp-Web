"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { Camera, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { API_BASE_URL } from "@/lib/config";

export function AccountSettings() {
  const { toast } = useToast();
  const { user, updateProfile, refreshProfile, accessToken } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasRefreshedProfile = useRef(false);

  const calculateAgeFromDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const dob = new Date(dateString);
    if (Number.isNaN(dob.getTime())) return "";
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return Number.isNaN(age) ? "" : age.toString();
  };

  const initialState = useMemo(
    () => ({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      age: calculateAgeFromDate(user?.dateOfBirth),
      gender: user?.gender ?? "",
      height: user?.height ? user.height.toString() : "",
      weight: user?.weight ? user.weight.toString() : "",
      trainingGoal: user?.trainingGoal ?? "",
    }),
    [
      user?.firstName,
      user?.lastName,
      user?.email,
      user?.phoneNumber,
      user?.dateOfBirth,
      user?.gender,
      user?.height,
      user?.weight,
      user?.trainingGoal,
    ]
  );

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  useEffect(() => {
    if (!hasRefreshedProfile.current) {
      hasRefreshedProfile.current = true;
      void refreshProfile();
    }
  }, [refreshProfile]);

  const initials =
    `${formData.firstName?.[0] ?? ""}${formData.lastName?.[0] ?? ""}`.trim() ||
    user?.email?.[0]?.toUpperCase() ||
    "NA";

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "File không hợp lệ",
        description: "Vui lòng chọn file ảnh (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File quá lớn",
        description: "Kích thước ảnh không được vượt quá 5MB",
        variant: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("ProfileImage", file);

      const response = await fetch(`${API_BASE_URL}/api/User/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      await refreshProfile();
      toast({
        title: "Cập nhật ảnh thành công",
        description: "Ảnh đại diện của bạn đã được cập nhật",
      });
    } catch (error) {
      setPreviewImage(null);
      toast({
        title: "Lỗi upload ảnh",
        description: error instanceof Error ? error.message : "Vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        age: formData.age,
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight,
        trainingGoal: formData.trainingGoal,
      });

      toast({
        title: "Đã lưu thành công",
        description: "Thông tin tài khoản đã được cập nhật.",
      });
    } catch (error) {
      toast({
        title: "Không thể lưu thay đổi",
        description:
          error instanceof Error ? error.message : "Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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
              <AvatarImage
                src={previewImage ?? user?.profileImageUrl ?? "/user-avatar.jpg"}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-indigo-50 transition"
                onClick={handleImageClick}
                disabled={isUploadingImage}
              >
                {isUploadingImage ? (
                  <>
                    <Upload className="h-4 w-4 animate-spin" />
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    Thay đổi ảnh
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG hoặc GIF. Tối đa 5MB.
              </p>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <Label htmlFor="firstName">Tên</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Họ</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
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
                disabled
                className="rounded-xl bg-muted/80 cursor-not-allowed text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
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
                value={formData.gender || undefined}
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
            <div className="space-y-2">
              <Label htmlFor="trainingGoal">Mục tiêu tập luyện</Label>
              <Select
                value={formData.trainingGoal || undefined}
                onValueChange={(value) =>
                  setFormData({ ...formData, trainingGoal: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn mục tiêu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="muscle-gain">Tăng cơ</SelectItem>
                  <SelectItem value="fat-loss">Giảm mỡ</SelectItem>
                  <SelectItem value="maintain">Giữ dáng</SelectItem>
                  <SelectItem value="endurance">Tăng sức bền</SelectItem>
                </SelectContent>
              </Select>
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
              disabled={isSaving}
              className="w-full md:w-auto flex items-center gap-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white hover:from-indigo-600 hover:to-purple-600 transition"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
