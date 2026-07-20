import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const inputVariants = cva(
  "flex w-full rounded-2xl border bg-surface text-sm text-foreground shadow-sm transition-colors placeholder:text-premium-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-10 px-3",
        md: "h-12 px-4",
        lg: "h-14 px-5 text-base",
      },
      tone: {
        default: "border-border-subtle",
        subtle: "border-transparent bg-surface-elevated",
        destructive: "border-red-500/40 focus-visible:ring-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, tone, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ size, tone }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
