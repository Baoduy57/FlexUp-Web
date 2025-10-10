"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-1 overflow-hidden transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm hover:shadow-md hover:scale-[1.05]",
        secondary:
          "bg-blue-200/70 text-blue-900 backdrop-blur-sm hover:bg-blue-300 hover:scale-[1.05]",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:scale-[1.05]",
        outline:
          "border border-emerald-400/40 text-foreground bg-background/40 backdrop-blur-sm hover:bg-background/60 hover:scale-[1.05]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
