"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Users,
  Calendar,
  Target,
  Zap,
  Award,
  Clock,
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: "individual" | "group";
  category: "workout" | "nutrition" | "consistency";
  duration: string;
  participants: number;
  maxParticipants?: number;
  progress: number;
  target: number;
  unit: string;
  reward: string;
  status: "active" | "completed" | "upcoming";
  endDate: string;
  isJoined: boolean;
  topParticipants?: Array<{
    name: string;
    avatar: string;
    progress: number;
  }>;
}

const challenges: Challenge[] = [
  {
    id: "1",
    title: "30 Ngày Squat Challenge",
    description: "Thực hiện squat mỗi ngày trong 30 ngày, tăng dần số lượng",
    type: "group",
    category: "workout",
    duration: "30 ngày",
    participants: 156,
    maxParticipants: 200,
    progress: 450,
    target: 1500,
    unit: "squats",
    reward: "Huy hiệu Squat Master + 500 điểm",
    status: "active",
    endDate: "2024-02-15",
    isJoined: true,
    topParticipants: [
      { name: "Hoàng Nam", avatar: "/user-avatar.jpg", progress: 520 },
      { name: "Minh Anh", avatar: "/user-avatar.jpg", progress: 480 },
      { name: "Thu Hà", avatar: "/user-avatar.jpg", progress: 465 },
    ],
  },
  {
    id: "2",
    title: "Tuần Lễ Cardio Cháy Mỡ",
    description: "Đốt cháy 3000 calories trong 7 ngày qua các bài tập cardio",
    type: "individual",
    category: "workout",
    duration: "7 ngày",
    participants: 89,
    progress: 1850,
    target: 3000,
    unit: "calories",
    reward: "Huy hiệu Cardio King + 300 điểm",
    status: "active",
    endDate: "2024-01-25",
    isJoined: false,
  },
  {
    id: "3",
    title: "21 Ngày Ăn Sạch",
    description: "Duy trì chế độ ăn healthy trong 21 ngày liên tiếp",
    type: "group",
    category: "nutrition",
    duration: "21 ngày",
    participants: 234,
    maxParticipants: 300,
    progress: 12,
    target: 21,
    unit: "ngày",
    reward: "Huy hiệu Nutrition Expert + 400 điểm",
    status: "active",
    endDate: "2024-02-05",
    isJoined: true,
    topParticipants: [
      { name: "Lan Anh", avatar: "/user-avatar.jpg", progress: 15 },
      { name: "Đức Anh", avatar: "/user-avatar.jpg", progress: 14 },
      { name: "Mai Linh", avatar: "/user-avatar.jpg", progress: 13 },
    ],
  },
  {
    id: "4",
    title: "Tháng Không Bỏ Lỡ",
    description: "Tập luyện ít nhất 20 ngày trong tháng",
    type: "individual",
    category: "consistency",
    duration: "30 ngày",
    participants: 67,
    progress: 18,
    target: 20,
    unit: "ngày",
    reward: "Huy hiệu Consistency Champion + 600 điểm",
    status: "active",
    endDate: "2024-01-31",
    isJoined: true,
  },
  {
    id: "5",
    title: "Push-up Marathon",
    description: "Thực hiện 1000 push-ups trong 2 tuần",
    type: "group",
    category: "workout",
    duration: "14 ngày",
    participants: 0,
    maxParticipants: 150,
    progress: 0,
    target: 1000,
    unit: "push-ups",
    reward: "Huy hiệu Push-up Pro + 450 điểm",
    status: "upcoming",
    endDate: "2024-02-10",
    isJoined: false,
  },
];

export function Challenges() {
  const [challengeList, setChallengeList] = useState(challenges);

  const handleJoinChallenge = (challengeId: string) => {
    setChallengeList(
      challengeList.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              isJoined: !challenge.isJoined,
              participants: challenge.isJoined
                ? challenge.participants - 1
                : challenge.participants + 1,
            }
          : challenge
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "workout":
        return "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-700";
      case "nutrition":
        return "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700";
      case "consistency":
        return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Đang diễn ra";
      case "completed":
        return "Đã kết thúc";
      case "upcoming":
        return "Sắp diễn ra";
      default:
        return "Không xác định";
    }
  };

  const activeChallenge = challengeList.filter((c) => c.status === "active");
  const upcomingChallenges = challengeList.filter(
    (c) => c.status === "upcoming"
  );
  const myChallenge = challengeList.filter((c) => c.isJoined);

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition-all rounded-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-lg font-semibold">
                  {challenge.title}
                </CardTitle>
                <Badge className={getCategoryColor(challenge.category)}>
                  {challenge.category === "workout" && (
                    <Zap className="h-3 w-3 mr-1" />
                  )}
                  {challenge.category === "nutrition" && (
                    <Target className="h-3 w-3 mr-1" />
                  )}
                  {challenge.category === "consistency" && (
                    <Calendar className="h-3 w-3 mr-1" />
                  )}
                  {challenge.category}
                </Badge>
                <Badge variant="outline">
                  {getStatusLabel(challenge.status)}
                </Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {challenge.duration}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Users className="h-4 w-4" /> {challenge.participants}
                {challenge.maxParticipants && `/${challenge.maxParticipants}`}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tiến độ</span>
              <span>
                {challenge.progress}/{challenge.target} {challenge.unit}
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(challenge.progress / challenge.target) * 100}%`,
              }}
              transition={{ duration: 1 }}
              className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-inner"
            />
          </div>

          {challenge.topParticipants && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top người tham gia</h4>
              <div className="flex gap-4">
                {challenge.topParticipants.slice(0, 3).map((p, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <Avatar className="h-6 w-6 border border-white/30">
                      <AvatarImage
                        src={p.avatar || "/placeholder.svg"}
                        alt={p.name}
                      />
                      <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">
                      ({p.progress})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm">
              <span className="font-medium">Phần thưởng: </span>
              <span className="text-muted-foreground">{challenge.reward}</span>
            </span>
            <Button
              onClick={() => handleJoinChallenge(challenge.id)}
              variant={challenge.isJoined ? "outline" : "default"}
              className="shadow-md"
            >
              {challenge.isJoined ? "Rời khỏi" : "Tham gia"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Thử thách đang tham gia
            </CardTitle>
            <Trophy className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myChallenge.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Thử thách hoàn thành
            </CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Điểm thưởng</CardTitle>
            <Target className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,400</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
      >
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-xl bg-white/10 backdrop-blur-md p-1">
            <TabsTrigger
              value="active"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
            >
              Đang diễn ra
            </TabsTrigger>
            <TabsTrigger
              value="my-challenges"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all"
            >
              Của tôi
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all"
            >
              Sắp diễn ra
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 pt-4">
            {activeChallenge.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </TabsContent>

          <TabsContent value="my-challenges" className="space-y-4 pt-4">
            {myChallenge.length > 0 ? (
              myChallenge.map((c) => <ChallengeCard key={c.id} challenge={c} />)
            ) : (
              <p className="text-sm text-muted-foreground">
                Bạn chưa tham gia thử thách nào
              </p>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4 pt-4">
            {upcomingChallenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
