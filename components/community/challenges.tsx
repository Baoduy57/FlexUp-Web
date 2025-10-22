"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  Loader2,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import {
  getChallenges,
  joinChallenge,
  leaveChallenge,
  type ChallengeCategory,
  type CommunityChallenge,
  type ChallengeStatus,
} from "@/lib/community-api";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CATEGORY_LABEL: Record<ChallengeCategory, string> = {
  workout: "Tập luyện",
  nutrition: "Dinh dưỡng",
  consistency: "Kỷ luật",
};

const CATEGORY_BADGE_STYLE: Record<ChallengeCategory, string> = {
  workout: "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-700",
  nutrition: "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700",
  consistency: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700",
};

const STATUS_LABEL: Record<ChallengeStatus, string> = {
  active: "Đang diễn ra",
  upcoming: "Sắp diễn ra",
  completed: "Đã kết thúc",
};

function normalizeRewardPoints(reward: string): number {
  const match = reward.match(/(\d[\d\.]*)/);
  if (!match) {
    return 0;
  }
  return parseInt(match[1].replace(/\D/g, ""), 10) || 0;
}

interface ChallengeCardProps {
  challenge: CommunityChallenge;
  onToggleJoin: (challenge: CommunityChallenge) => Promise<void>;
  isProcessing: boolean;
}

function ChallengeCard({ challenge, onToggleJoin, isProcessing }: ChallengeCardProps) {
  const progressPercent =
    challenge.target > 0
      ? Math.min(100, Math.round((challenge.progress / challenge.target) * 100))
      : 0;

  return (
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
                <CardTitle className="text-lg font-semibold">{challenge.title}</CardTitle>
                <Badge className={CATEGORY_BADGE_STYLE[challenge.category]}>
                  {challenge.category === "workout" && <Zap className="h-3 w-3 mr-1" />}
                  {challenge.category === "nutrition" && <Target className="h-3 w-3 mr-1" />}
                  {challenge.category === "consistency" && <Calendar className="h-3 w-3 mr-1" />}
                  {CATEGORY_LABEL[challenge.category]}
                </Badge>
                <Badge variant="outline">{STATUS_LABEL[challenge.status]}</Badge>
              </div>
              <CardDescription>{challenge.description}</CardDescription>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {challenge.duration}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Users className="h-4 w-4" />
                {challenge.participants}
                {challenge.maxParticipants ? `/${challenge.maxParticipants}` : ""}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tiến độ</span>
              <span>
                {challenge.progress}/{challenge.target} {challenge.unit}
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1 }}
              className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-inner"
            />
          </div>

          {challenge.topParticipants.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Top người tham gia</h4>
              <div className="flex gap-4 flex-wrap">
                {challenge.topParticipants.map((participant, index) => (
                  <div key={`${participant.user.userId}-${index}`} className="flex items-center gap-2 text-xs">
                    <Avatar className="h-6 w-6 border border-white/30">
                      <AvatarImage
                        src={participant.user.avatarUrl ?? "/user-avatar.jpg"}
                        alt={participant.user.displayName}
                      />
                      <AvatarFallback>{participant.user.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{participant.user.displayName}</span>
                    <span className="text-muted-foreground">({participant.progressValue})</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-sm">
              <span className="font-medium">Phần thưởng: </span>
              <span className="text-muted-foreground">{challenge.reward}</span>
            </span>
            <Button
              onClick={() => onToggleJoin(challenge)}
              variant={challenge.isJoined ? "outline" : "default"}
              className="shadow-md"
              disabled={challenge.status !== "active" || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang xử lý
                </>
              ) : challenge.isJoined ? (
                "Rời khỏi"
              ) : (
                "Tham gia"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Challenges() {
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<CommunityChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const loadChallenges = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getChallenges();
      setChallenges(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Không thể tải thử thách",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void loadChallenges();
  }, [loadChallenges]);

  const handleToggleJoin = async (challenge: CommunityChallenge) => {
    try {
      setProcessingId(challenge.id);
      if (challenge.isJoined) {
        await leaveChallenge(challenge.id);
        toast({
          title: "Đã rời khỏi thử thách",
          description: challenge.title,
        });
      } else {
        const updated = await joinChallenge(challenge.id);
        toast({
          title: "Tham gia thử thách thành công",
          description: updated.title,
        });
      }
      await loadChallenges();
    } catch (error) {
      console.error(error);
      toast({
        title: "Không thể cập nhật thử thách",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const activeChallenges = useMemo(
    () => challenges.filter((challenge) => challenge.status === "active"),
    [challenges]
  );
  const myChallenges = useMemo(
    () => challenges.filter((challenge) => challenge.isJoined),
    [challenges]
  );
  const upcomingChallenges = useMemo(
    () => challenges.filter((challenge) => challenge.status === "upcoming"),
    [challenges]
  );

  const joinedActiveCount = activeChallenges.filter((challenge) => challenge.isJoined).length;
  const completedCount = challenges.filter((challenge) => challenge.status === "completed" && challenge.isJoined).length;
  const potentialRewards = myChallenges.reduce((sum, challenge) => sum + normalizeRewardPoints(challenge.reward), 0);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Thử thách đang tham gia</CardTitle>
            <Trophy className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{joinedActiveCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Thử thách hoàn thành</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Điểm thưởng tiềm năng</CardTitle>
            <Target className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{potentialRewards.toLocaleString()} điểm</div>
          </CardContent>
        </Card>
      </motion.div>

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
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : activeChallenges.length === 0 ? (
              <Card className="border-dashed border-2 border-white/30 bg-white/40">
                <CardContent className="py-10 text-center space-y-2">
                  <CardTitle className="text-lg">Chưa có thử thách nào đang hoạt động</CardTitle>
                  <CardDescription>Các thử thách mới sẽ được cập nhật sớm.</CardDescription>
                </CardContent>
              </Card>
            ) : (
              activeChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onToggleJoin={handleToggleJoin}
                  isProcessing={processingId === challenge.id}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="my-challenges" className="space-y-4 pt-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : myChallenges.length === 0 ? (
              <Card className="border-dashed border-2 border-white/30 bg-white/40">
                <CardContent className="py-10 text-center space-y-2">
                  <CardTitle className="text-lg">Bạn chưa tham gia thử thách nào</CardTitle>
                  <CardDescription>Khám phá và tham gia thử thách để nhận quà tặng hấp dẫn.</CardDescription>
                </CardContent>
              </Card>
            ) : (
              myChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onToggleJoin={handleToggleJoin}
                  isProcessing={processingId === challenge.id}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4 pt-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : upcomingChallenges.length === 0 ? (
              <Card className="border-dashed border-2 border-white/30 bg-white/40">
                <CardContent className="py-10 text-center space-y-2">
                  <CardTitle className="text-lg">Không có thử thách sắp diễn ra</CardTitle>
                  <CardDescription>Hãy quay lại sau để xem các thử thách mới.</CardDescription>
                </CardContent>
              </Card>
            ) : (
              upcomingChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onToggleJoin={handleToggleJoin}
                  isProcessing={processingId === challenge.id}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
