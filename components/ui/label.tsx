"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm font-semibold leading-tight text-gray-700 dark:text-gray-200 select-none transition-colors duration-200",
        "peer-focus:text-blue-500 dark:peer-focus:text-cyan-400", // highlight khi input focus
        "group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:cursor-not-allowed",
        "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Label };
