import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs leading-5",
      sm: "text-sm leading-6",
      md: "text-base leading-7",
      lg: "text-lg leading-8",
    },
    tone: {
      default: "text-foreground",
      subtle: "text-foreground/80",
      muted: "text-foreground/65",
      accent: "text-premium-accent-blue",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as: Component = "p", className, size, tone, weight, ...props }, ref) => {
    return React.createElement(Component, {
      ref: ref as React.Ref<HTMLElement>,
      className: cn(textVariants({ size, tone, weight }), className),
      ...props,
    });
  },
);

Text.displayName = "Text";
