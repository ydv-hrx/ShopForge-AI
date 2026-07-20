import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-3xl px-4 sm:px-6",
      md: "max-w-5xl px-4 sm:px-6 lg:px-8",
      lg: "max-w-7xl px-4 sm:px-6 lg:px-8",
      full: "px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";
