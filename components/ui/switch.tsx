"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-gray-300 dark:bg-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-400 data-[state=checked]:to-cyan-500",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transform ring-0 transition-transform duration-300 ease-in-out",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
