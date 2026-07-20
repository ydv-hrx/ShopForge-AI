"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-3">
      <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em]">
        Quantity
      </Text>
      <div className="inline-flex items-center rounded-full border border-border-subtle bg-surface p-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Decrease quantity"
          disabled={quantity === 1}
          onClick={() => {
            setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
          }}
        >
          −
        </Button>
        <span className="min-w-12 px-4 text-center text-sm font-medium text-foreground">
          {quantity}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Increase quantity"
          onClick={() => {
            setQuantity((currentQuantity) => currentQuantity + 1);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
}
