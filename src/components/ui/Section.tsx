import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./cn";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-8 sm:py-10",
      md: "py-12 sm:py-16",
      lg: "py-16 sm:py-20 lg:py-24",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", className, spacing, ...props }, ref) => {
    return React.createElement(Component, {
      ref: ref as React.Ref<HTMLElement>,
      className: cn(sectionVariants({ spacing }), className),
      ...props,
    });
  },
);

Section.displayName = "Section";
