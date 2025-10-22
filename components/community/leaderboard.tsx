"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  Loader2,
  Medal,
  Minus,
  TrendingDown,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";

import {
  getLeaderboard,
  type CommunityLeaderboard,
  type CommunityLeaderboardEntry,
  type LeaderboardPeriod,
} from "@/lib/community-api";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const PERIOD_LABEL: Record<LeaderboardPeriod, string> = {
  weekly: "Bảng xếp hạng tuần",
  monthly: "Bảng xếp hạng tháng",
};

const PERIOD_TABS: Array<{ value: LeaderboardPeriod; label: string }> = [
  { value: "weekly", label: "Bảng xếp hạng tuần" },
  { value: "monthly", label: "Bảng xếp hạng tháng" },
];

function getLevelColor(level: string) {
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
}

function getTrendIcon(trend: CommunityLeaderboardEntry["trend"]) {
  if (trend === "up") {
    return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />;
  }
  if (trend === "down") {
    return <TrendingDown className="h-3.5 w-3.5 text-rose-500" />;
  }
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) {
    return <Trophy className="h-6 w-6 text-yellow-400 drop-shadow-md" />;
  }
  if (rank === 2) {
    return <Medal className="h-6 w-6 text-gray-300 drop-shadow-md" />;
  }
  if (rank === 3) {
    return <Award className="h-6 w-6 text-amber-400 drop-shadow-md" />;
  }
  return (
    <div className="h-6 w-6 rounded-full bg-white/60 flex items-center justify-center text-xs font-semibold text-muted-foreground">
      #{rank}
    </div>
  );
}

function LeaderboardList({ entries }: { entries: CommunityLeaderboardEntry[] }) {
  if (entries.length === 0) {
    return (
      <Card className="border-dashed border-2 border-white/30 bg-white/40">
        <CardContent className="py-10 text-center space-y-2">
          <CardTitle className="text-lg">Chưa có dữ liệu đủ để xếp hạng</CardTitle>
          <p className="text-sm text-muted-foreground">
            Hãy hoàn thành các buổi tập luyện để xuất hiện trong bảng xếp hạng.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {entries.map((entry, index) => (
        <motion.div
          key={`${entry.user.userId}-${entry.rank}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <Card className="border border-white/20 backdrop-blur-md bg-white/70 hover:shadow-lg transition">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <RankIcon rank={entry.rank} />
                  <Avatar className="border border-white/50">
                    <AvatarImage
                      src={entry.user.avatarUrl ?? "/user-avatar.jpg"}
                      alt={entry.user.displayName}
                    />
                    <AvatarFallback>{entry.user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{entry.user.displayName}</span>
                      <Badge variant="outline" className={getLevelColor(entry.user.level)}>
                        {entry.user.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <span>{entry.points.toLocaleString()} điểm</span>
                      <span>•</span>
                      <span>{entry.totalWorkouts} buổi</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1 justify-end">
                    {getTrendIcon(entry.trend)}
                    <span className="text-sm font-medium">#{entry.rank}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground justify-end">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {entry.streakDays} ngày liên tiếp
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5" />
                      {entry.totalWorkouts} buổi
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
}

export function Leaderboard() {
  const { toast } = useToast();
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>("weekly");
  const [loadingState, setLoadingState] = useState<Record<LeaderboardPeriod, boolean>>({
    weekly: false,
    monthly: false,
  });
  const [data, setData] = useState<Record<LeaderboardPeriod, CommunityLeaderboard | null>>({
    weekly: null,
    monthly: null,
  });

  const fetchLeaderboard = useCallback(async (period: LeaderboardPeriod) => {
    setLoadingState((prev) => ({ ...prev, [period]: true }));
    try {
      const leaderboard = await getLeaderboard(period);
      setData((prev) => ({ ...prev, [period]: leaderboard }));
    } catch (error) {
      console.error(error);
      toast({
        title: "Không thể tải bảng xếp hạng",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, [period]: false }));
    }
  }, [toast]);

  useEffect(() => {
    void fetchLeaderboard("weekly");
  }, [fetchLeaderboard]);

  useEffect(() => {
    if (!data[activePeriod] && !loadingState[activePeriod]) {
      void fetchLeaderboard(activePeriod);
    }
  }, [activePeriod, data, fetchLeaderboard, loadingState]);

  const currentData = data[activePeriod];
  const currentUser = useMemo<CommunityLeaderboardEntry | null>(() => {
    if (!currentData) {
      return null;
    }
    return currentData.currentUser ?? currentData.entries.at(0) ?? null;
  }, [currentData]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thứ hạng của bạn</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentUser ? `#${currentUser.rank}` : loadingState[activePeriod] ? "…" : "—"}
            </div>
            <p className="text-xs text-muted-foreground">{PERIOD_LABEL[activePeriod]}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm số</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentUser ? currentUser.points.toLocaleString() : loadingState[activePeriod] ? "…" : "0"}
            </div>
            <p className="text-xs text-muted-foreground">Tổng điểm tích lũy trong kỳ</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chuỗi ngày</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentUser ? currentUser.streakDays : loadingState[activePeriod] ? "…" : 0}
            </div>
            <p className="text-xs text-muted-foreground">Ngày luyện tập liên tiếp</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
      >
        <Tabs
          defaultValue="weekly"
          value={activePeriod}
          onValueChange={(value) => setActivePeriod(value as LeaderboardPeriod)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-white/10 backdrop-blur-md p-1">
            {PERIOD_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {PERIOD_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
              {loadingState[tab.value] && !data[tab.value] ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <LeaderboardList entries={data[tab.value]?.entries ?? []} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  );
}
