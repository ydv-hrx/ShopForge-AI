import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const cardVariants = cva("rounded-3xl border text-foreground shadow-sm", {
  variants: {
    variant: {
      default: "border-border-subtle bg-surface",
      elevated: "border-transparent bg-surface-elevated shadow-md",
      outline: "border-border-subtle bg-transparent shadow-none",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
