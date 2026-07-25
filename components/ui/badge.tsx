import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#06635d] text-white shadow hover:bg-[#06635d]/80 dark:bg-[#14b8a6] dark:text-[#021418]",
        secondary:
          "border-transparent bg-[#112344] text-white hover:bg-[#112344]/80 dark:bg-[#1e293b] dark:text-white",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-[#06635d]/30 dark:border-[#14b8a6]/30",
        success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30",
        warning: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30",
        danger: "border-transparent bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
