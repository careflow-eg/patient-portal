import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#06635d] text-white hover:bg-[#044c47] dark:bg-[#14b8a6] dark:text-[#021418] dark:hover:bg-[#0d9488]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-muted hover:text-accent-foreground dark:border-[#1e3a40] dark:hover:bg-[#11262a]",
        secondary: "bg-[#112344] text-white hover:bg-[#0a162b] dark:bg-[#1e293b] dark:hover:bg-[#334155]",
        ghost: "hover:bg-muted hover:text-accent-foreground dark:hover:bg-[#11262a]",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-white/80 dark:bg-[#0b1f24]/80 backdrop-blur-md border border-[#06635d]/20 text-[#06635d] dark:text-[#14b8a6] hover:bg-[#06635d]/10 dark:hover:bg-[#14b8a6]/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
