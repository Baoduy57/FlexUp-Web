"use client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="py-15 md:py-28 px-4 relative overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Column: Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left ml-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Rating Section */}
          <div className="flex items-center justify-center md:justify-start mb-6">
            <div className="flex -space-x-1 mr-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
            </div>
            {/* Đổi màu chữ sang text-muted-foreground cho phù hợp nền sáng */}
            <p className="text-sm text-muted-foreground">
              4.9 stars
              <br />
              <span className="font-semibold text-foreground">
                79,000 ratings
              </span>{" "}
              on Website
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-white">
            Work out, <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              your way
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg md:mx-0 mx-auto">
            Thousands of lessons, no equipment needed.
          </p>

          {/* Call to Action Button */}
          <Link href="/register">
            <Button
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-red-600 hover:bg-red-700 text-white transition shadow-lg font-bold"
            >
              Try 30 days free
            </Button>
          </Link>

          {/* Small Disclaimer */}
          <p className="text-sm text-muted-foreground mt-4">
            Now members try for free. Cancel anytime.
          </p>
        </motion.div>

        {/* Right Column: Product Images (Phones) */}
        <motion.div
          className="md:w-1/2 flex justify-center items-center mt-16 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-lg h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Phone 1 (Left, slightly rotated) */}
            <Image
              src="/placeholder-phone.jpg"
              alt="Fitness App on iPhone"
              width={280}
              height={560}
              className="absolute left-0 -rotate-12 transform scale-90 md:scale-100 shadow-2xl rounded-xl z-10"
              style={{
                top: "50%",
                transform: "translateY(-50%) rotate(-12deg) scale(0.9)",
                left: "10%",
              }}
              priority
            />
            {/* Phone 2 (Right, main, slightly rotated) */}
            <Image
              src="/placeholder-phone4.jpg"
              alt="Fitness App on iPhone"
              width={250}
              height={550}
              className="absolute right-0 rotate-12 transform scale-100 md:scale-110 shadow-2xl rounded-xl z-20"
              style={{
                top: "50%",
                transform: "translateY(-50%) rotate(12deg) scale(1.1)",
                right: "10%",
              }}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
