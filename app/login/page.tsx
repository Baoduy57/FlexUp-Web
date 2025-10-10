"use client";

import { LoginForm } from "@/components/auth/login-form";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-cyan-50" />

      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-md">
            FlexUp
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            Hành trình fitness của bạn bắt đầu từ đây. Đăng nhập để tiếp tục
            trải nghiệm.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
