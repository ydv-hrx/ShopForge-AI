import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-5 w-5 border-2",
        lg: "h-6 w-6 border-[3px]",
      },
      tone: {
        default: "text-foreground",
        muted: "text-foreground/60",
        accent: "text-premium-accent-blue",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  },
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, tone, label = "Loading", ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(spinnerVariants({ size, tone }), className)}
        {...props}
      />
    );
  },
);

Spinner.displayName = "Spinner";
