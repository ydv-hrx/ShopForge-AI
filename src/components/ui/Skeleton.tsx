import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const skeletonVariants = cva("animate-pulse rounded-2xl bg-surface-elevated", {
  variants: {
    size: {
      sm: "h-3",
      md: "h-4",
      lg: "h-6",
      avatar: "h-10 w-10 rounded-full",
      card: "min-h-24 w-full",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";