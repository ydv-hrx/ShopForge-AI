"use client";

import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { FeaturedProduct } from "@/services/shopify/products";

type ProductCardProps = {
  product: FeaturedProduct;
};

function formatMoney(amount: string, currencyCode: string) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currencyCode}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(numericAmount);
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Card variant="elevated" padding="none" className="group overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="relative min-h-80 overflow-hidden border-b border-border-subtle bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_46%),linear-gradient(135deg,_rgba(16,16,18,0.96),_rgba(63,63,69,0.72))]">
          {product.featuredImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${product.featuredImage.url})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_transparent_56%)]" />
          <div className="absolute left-4 top-4">
            <Badge variant={product.availableForSale ? "accent" : "subtle"} size="sm">
              {product.availableForSale ? "Available" : "Sold out"}
            </Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em] text-white/70">
              Product image placeholder
            </Text>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="space-y-3">
            <Heading level={2} size="sm">
              {product.title}
            </Heading>
            <Text as="p" size="lg" weight="semibold">
              {formatMoney(product.price.amount, product.price.currencyCode)}
            </Text>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="md"
            className="mt-auto w-full"
            onClick={() => {
              router.push(`/products/${product.handle}`);
            }}
          >
            View Product
          </Button>
        </div>
      </div>
    </Card>
  );
}
