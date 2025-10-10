"use client";

import { RegisterForm } from "@/components/auth/register-form";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-cyan-50" />

      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 drop-shadow-md mb-2">
            FlexUp
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Tạo tài khoản mới để bắt đầu hành trình fitness của bạn
          </p>
        </div>

        {/* Form */}
        <RegisterForm />
      </motion.div>
    </div>
  );
}
