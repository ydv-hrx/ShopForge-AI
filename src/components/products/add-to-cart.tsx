"use client";

import { Button } from "@/components/ui/Button";

type AddToCartProps = {
  disabled: boolean;
};

export function AddToCart({ disabled }: AddToCartProps) {
  return (
    <Button type="button" size="lg" className="w-full" disabled={disabled}>
      {disabled ? "Unavailable" : "Add To Cart"}
    </Button>
  );
}
