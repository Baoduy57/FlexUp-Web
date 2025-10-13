"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, TrendingUp, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: string;
  streak: number;
  workoutsThisWeek: number;
  change: "up" | "down" | "same";
}

const weeklyLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Hoàng Nam",
    avatar: "/user-avatar.jpg",
    points: 2450,
    level: "Cao cấp",
    streak: 15,
    workoutsThisWeek: 6,
    change: "up",
  },
  {
    rank: 2,
    name: "Minh Anh",
    avatar: "/user-avatar.jpg",
    points: 2380,
    level: "Trung cấp",
    streak: 12,
    workoutsThisWeek: 5,
    change: "same",
  },
  {
    rank: 3,
    name: "Thu Hà",
    avatar: "/user-avatar.jpg",
    points: 2250,
    level: "Trung cấp",
    streak: 8,
    workoutsThisWeek: 5,
    change: "up",
  },
  {
    rank: 4,
    name: "Đức Anh",
    avatar: "/user-avatar.jpg",
    points: 2180,
    level: "Trung cấp",
    streak: 10,
    workoutsThisWeek: 4,
    change: "down",
  },
  {
    rank: 5,
    name: "Lan Anh",
    avatar: "/user-avatar.jpg",
    points: 2050,
    level: "Mới bắt đầu",
    streak: 6,
    workoutsThisWeek: 4,
    change: "up",
  },
  {
    rank: 6,
    name: "Bạn",
    avatar: "/user-avatar.jpg",
    points: 1980,
    level: "Trung cấp",
    streak: 7,
    workoutsThisWeek: 3,
    change: "same",
  },
];

const monthlyLeaderboard: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Hoàng Nam",
    avatar: "/user-avatar.jpg",
    points: 8950,
    level: "Cao cấp",
    streak: 28,
    workoutsThisWeek: 6,
    change: "same",
  },
  {
    rank: 2,
    name: "Minh Anh",
    avatar: "/user-avatar.jpg",
    points: 8720,
    level: "Trung cấp",
    streak: 25,
    workoutsThisWeek: 5,
    change: "up",
  },
  {
    rank: 3,
    name: "Bạn",
    avatar: "/user-avatar.jpg",
    points: 8450,
    level: "Trung cấp",
    streak: 22,
    workoutsThisWeek: 3,
    change: "up",
  },
];

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400 drop-shadow-md" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300 drop-shadow-md" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600 drop-shadow-md" />;
      default:
        return (
          <span className="text-lg font-bold text-muted-foreground">
            #{rank}
          </span>
        );
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Mới bắt đầu":
        return "bg-green-100 text-green-800";
      case "Trung cấp":
        return "bg-blue-100 text-blue-800";
      case "Cao cấp":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const LeaderboardList = ({ users }: { users: LeaderboardUser[] }) => (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="space-y-3"
    >
      {users.map((user) => (
        <motion.div
          key={`${user.rank}-${user.name}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <Card
            className={`transition-all hover:scale-[1.01] hover:shadow-lg backdrop-blur-xl bg-white/10 border-white/20 ${
              user.name === "Bạn" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar
                    className={`h-11 w-11 border-2 ${
                      user.rank <= 3
                        ? "border-yellow-400 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.name === "Bạn" && (
                        <Badge variant="secondary">Bạn</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getLevelColor(user.level)}
                      >
                        {user.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {user.points} điểm
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {getChangeIcon(user.change)}
                    <span className="text-sm font-medium">#{user.rank}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {user.streak} ngày
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {user.workoutsThisWeek} buổi
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Thứ hạng của bạn
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#6</div>
            <p className="text-xs text-muted-foreground">Trong tuần này</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm số</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,980</div>
            <p className="text-xs text-muted-foreground">+120 điểm tuần này</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chuỗi ngày</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Ngày liên tiếp</p>
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
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-white/10 backdrop-blur-md p-1">
            <TabsTrigger
              value="weekly"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
            >
              Bảng xếp hạng tuần
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all"
            >
              Bảng xếp hạng tháng
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <LeaderboardList users={weeklyLeaderboard} />
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <LeaderboardList users={monthlyLeaderboard} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
