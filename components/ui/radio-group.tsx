"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-4", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 " +
          "bg-white dark:bg-gray-800 transition-all duration-200 " +
          "hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 " +
          "data-[state=checked]:border-blue-600 data-[state=checked]:shadow-md",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(
          "h-3 w-3 rounded-full bg-blue-600 transition-transform duration-200 scale-0",
          "data-[state=checked]:scale-100"
        )}
      />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
