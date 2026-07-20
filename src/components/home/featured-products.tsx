import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { FeaturedProduct } from "@/services/shopify/products";

type FeaturedProductsProps = {
  products: FeaturedProduct[];
};

const productVisualVariants = [
  "bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.24),_transparent_45%),linear-gradient(135deg,_rgba(18,18,20,0.96),_rgba(74,74,80,0.72))]",
  "bg-[radial-gradient(circle_at_top,_rgba(0,102,204,0.22),_transparent_42%),linear-gradient(135deg,_rgba(29,29,32,0.95),_rgba(87,87,94,0.68))]",
  "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_42%),linear-gradient(135deg,_rgba(12,12,14,0.98),_rgba(48,48,52,0.76))]",
  "bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_46%),linear-gradient(135deg,_rgba(24,24,27,0.96),_rgba(80,80,86,0.7))]",
] as const;

function getProductVisualClassName(index: number) {
  return productVisualVariants[index % productVisualVariants.length];
}

function formatMoney(amount: string, currencyCode: string) {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return `${amount} ${currencyCode}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
}

function getPrimaryPrice(product: FeaturedProduct) {
  return (
    <div className="flex items-end gap-2">
      <Text as="p" size="lg" weight="semibold">
        {formatMoney(product.price.amount, product.price.currencyCode)}
      </Text>
      {product.compareAtPrice ? (
        <Text as="p" size="sm" tone="muted" className="pb-0.5 line-through">
          {formatMoney(product.compareAtPrice.amount, product.compareAtPrice.currencyCode)}
        </Text>
      ) : null}
    </div>
  );
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="border-t border-border-subtle bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 sm:max-w-2xl">
          <Badge variant="subtle" size="md">
            Featured products
          </Badge>
          <Heading level={2} size="xl">
            Premium products presented with a refined commerce layout.
          </Heading>
          <Text as="p" size="lg" tone="subtle">
            A responsive product grid designed to highlight pricing, social proof, and quick purchase actions with placeholder merchandising data.
          </Text>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <Card
              key={product.id}
              variant="elevated"
              padding="none"
              className="group overflow-hidden"
            >
              <div className="flex h-full flex-col">
                <div
                  className={`relative min-h-44 overflow-hidden border-b border-border-subtle ${getProductVisualClassName(index)}`}
                >
                  {product.featuredImage ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.featuredImage.url})` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_transparent_56%)]" />
                  <div className="absolute left-4 top-4">
                    <Badge variant="accent" size="sm">
                      {product.availableForSale ? "Available" : "Sold out"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em] text-white/70">
                      Product image placeholder
                    </Text>
                    <Text as="p" size="xs" tone="muted" className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-white/85 backdrop-blur">
                      ★ Featured
                    </Text>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                  <div className="space-y-3">
                    <Heading level={3} size="sm">
                      {product.title}
                    </Heading>
                    {getPrimaryPrice(product)}
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <Button type="button" size="md" className="flex-1">
                      Shop Now
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Save ${product.title} to wishlist`}
                    >
                      ♥
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
