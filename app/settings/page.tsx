"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSettings } from "@/components/settings/account-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { SubscriptionSettings } from "@/components/settings/subscription-settings";
import { AppPreferences } from "@/components/settings/app-preferences";
import { User, Bell, Crown, SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-500/20 via-background to-cyan-500/20">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]" />
      <Sidebar />

      <main className="relative md:ml-64 p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto space-y-10"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Cài đặt
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Quản lý tài khoản và tùy chỉnh trải nghiệm ứng dụng của bạn
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-lg"
          >
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-xl bg-white/10 backdrop-blur-md p-1">
                <TabsTrigger
                  value="account"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Tài khoản</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Thông báo</span>
                </TabsTrigger>
                <TabsTrigger
                  value="subscription"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Crown className="h-4 w-4" />
                  <span className="hidden sm:inline">Gói cước</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all flex items-center justify-center gap-2"
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Tùy chọn</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AccountSettings />
                </motion.div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <NotificationSettings />
                </motion.div>
              </TabsContent>

              <TabsContent value="subscription" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <SubscriptionSettings />
                </motion.div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AppPreferences />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
