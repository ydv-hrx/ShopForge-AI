import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { FeaturedProduct } from "@/services/shopify/products";

import { ProductCard } from "./product-card";

type CollectionProductsGridProps = {
  products: FeaturedProduct[];
};

export function CollectionProductsGrid({ products }: CollectionProductsGridProps) {
  return (
    <Section spacing="lg" className="bg-background pb-20">
      <Container>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card variant="elevated" padding="lg">
            <div className="flex flex-col gap-3">
              <Heading level={2} size="sm">
                No products available
              </Heading>
              <Text as="p" size="sm" tone="subtle">
                This collection currently does not contain any products.
              </Text>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}
