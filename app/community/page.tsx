"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { SocialFeed } from "@/components/community/social-feed";
import { Leaderboard } from "@/components/community/leaderboard";
import { Challenges } from "@/components/community/challenges";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { PremiumFeatureGate } from "@/components/premium/premium-feature-gate";

export default function CommunityPage() {
  return (
    <PremiumFeatureGate featureName="community-access">
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_70%)]" />
        <Sidebar />

        <main className="relative md:ml-64 p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto space-y-10"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
            >
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Cộng đồng
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Kết nối, chia sẻ và cùng nhau tiến bộ trong hành trình fitness
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg"
            >
              <Tabs defaultValue="feed" className="w-full">
                <TabsList className="grid w-full grid-cols-3 rounded-xl bg-white/10 backdrop-blur-md p-1">
                  <TabsTrigger
                    value="feed"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
                  >
                    Bảng tin
                  </TabsTrigger>
                  <TabsTrigger
                    value="leaderboard"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
                  >
                    Bảng xếp hạng
                  </TabsTrigger>
                  <TabsTrigger
                    value="challenges"
                    className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all"
                  >
                    Thử thách
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="feed" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SocialFeed />
                  </motion.div>
                </TabsContent>

                <TabsContent value="leaderboard" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Leaderboard />
                  </motion.div>
                </TabsContent>

                <TabsContent value="challenges" className="space-y-6 mt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Challenges />
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </PremiumFeatureGate>
  );
}
