"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white " +
          "dark:bg-gray-900 dark:border-gray-700 " +
          "hover:border-blue-400 hover:shadow-sm " +
          "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-blue-500 data-[state=checked]:to-cyan-500 data-[state=checked]:border-transparent " +
          "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white transition-all duration-200 scale-0 opacity-0 data-[state=checked]:scale-100 data-[state=checked]:opacity-100">
        <CheckIcon className="w-4 h-4" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
