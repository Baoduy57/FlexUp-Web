"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0 - 100
  indicatorClassName?: string; // custom màu cho thanh progress
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
          indicatorClassName
        )}
      />
      {children}
    </div>
  )
);

Progress.displayName = "Progress";

export { Progress };
