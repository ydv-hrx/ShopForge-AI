import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const headingVariants = cva("tracking-tight text-foreground", {
  variants: {
    size: {
      xs: "text-lg font-semibold leading-7",
      sm: "text-xl font-semibold leading-8",
      md: "text-2xl font-semibold leading-9",
      lg: "text-3xl font-semibold leading-tight",
      xl: "text-4xl font-semibold leading-tight",
      "2xl": "text-5xl font-semibold leading-tight",
    },
    tone: {
      default: "text-foreground",
      subtle: "text-foreground/80",
      muted: "text-foreground/65",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingTagByLevel: Record<HeadingLevel, keyof React.JSX.IntrinsicElements> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, className, size, tone, ...props }, ref) => {
    const Component = headingTagByLevel[level];

    return React.createElement(Component, {
      ref,
      className: cn(headingVariants({ size, tone }), className),
      ...props,
    });
  },
);

Heading.displayName = "Heading";
