"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { User, Target, Activity, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

export function ProfileSetup() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [isLoading, setIsLoading] = useState(false);

  const { completeProfile, user: authUser } = useAuth();

  const calculateAgeFromDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const dob = new Date(dateString);
    if (Number.isNaN(dob.getTime())) return "";
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return Number.isNaN(age) ? "" : age.toString();
  };

  const initialProfileState = useMemo(
    () => ({
      firstName: authUser?.firstName ?? "",
      lastName: authUser?.lastName ?? "",
      age: calculateAgeFromDate(authUser?.dateOfBirth),
      gender: authUser?.gender ?? "",
      height: authUser?.height ? authUser.height.toString() : "",
      weight: authUser?.weight ? authUser.weight.toString() : "",
      goal: authUser?.trainingGoal ?? "muscle-gain",
      level: "",
      weeklyWorkouts: "",
    }),
    [
      authUser?.firstName,
      authUser?.lastName,
      authUser?.dateOfBirth,
      authUser?.gender,
      authUser?.height,
      authUser?.weight,
      authUser?.trainingGoal,
    ]
  );

  const [profileData, setProfileData] = useState(initialProfileState);

  useEffect(() => {
    setProfileData((prev) => ({
      ...prev,
      ...initialProfileState,
    }));
  }, [initialProfileState]);

  const { toast } = useToast();

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      await completeProfile(profileData);

      toast({
        title: "Hồ sơ đã được thiết lập!",
        description: "Chào mừng bạn đến với ứng dụng fitness của chúng tôi.",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description:
          error instanceof Error ? error.message : "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl border border-gray-100">
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md">
          Thiết lập hồ sơ cá nhân
        </CardTitle>
        <CardDescription className="text-gray-500">
          Bước {step} / {totalSteps} • Giúp chúng tôi cá nhân hoá trải nghiệm
          của bạn
        </CardDescription>
        <Progress
          value={(step / totalSteps) * 100}
          className="w-full transition-all duration-500"
        />
      </CardHeader>

      <CardContent className="relative min-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Tên</Label>
                  <Input
                    id="firstName"
                    placeholder="Nguyễn"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Họ</Label>
                  <Input
                    id="lastName"
                    placeholder="Văn A"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                    className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Tuổi</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={profileData.age}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        age: e.target.value,
                      })
                    }
                    className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Thông số cơ thể</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Chiều cao (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={profileData.height}
                    onChange={(e) =>
                      setProfileData({ ...profileData, height: e.target.value })
                    }
                    className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Cân nặng (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="65"
                    value={profileData.weight}
                    onChange={(e) =>
                      setProfileData({ ...profileData, weight: e.target.value })
                    }
                    className="rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Target className="h-6 w-6 text-blue-600" />
                <h3 className=" text-lg font-semibold">Mục tiêu tập luyện</h3>
              </div>
              <RadioGroup
                value={profileData.goal}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, goal: value })
                }
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                  <Label htmlFor="muscle-gain">Tăng cơ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fat-loss" id="fat-loss" />
                  <Label htmlFor="fat-loss">Giảm mỡ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintain" id="maintain" />
                  <Label htmlFor="maintain">Giữ dáng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="endurance" id="endurance" />
                  <Label htmlFor="endurance">Tăng sức bền</Label>
                </div>
              </RadioGroup>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Kế hoạch tập luyện</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Cấp độ hiện tại</Label>
                  <Select
                    value={profileData.level}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn cấp độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Người mới</SelectItem>
                      <SelectItem value="advanced">
                        Người đã có kinh nghiệm
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Số buổi tập mỗi tuần</Label>
                  <Select
                    value={profileData.weeklyWorkouts}
                    onValueChange={(value) =>
                      setProfileData({
                        ...profileData,
                        weeklyWorkouts: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn số buổi" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num} buổi
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="rounded-xl"
          >
            Quay lại
          </Button>
          <Button
            onClick={step === totalSteps ? handleComplete : nextStep}
            disabled={isLoading}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading
              ? "Đang xử lý..."
              : step === totalSteps
              ? "Hoàn thành"
              : "Tiếp tục"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
