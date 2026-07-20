import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { CollectionCard } from "./collection-card";
import type { FeaturedCollection } from "@/services/shopify/collections";

type CollectionGridProps = {
  collections: FeaturedCollection[];
};

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <Section spacing="lg" className="border-t border-border-subtle bg-background">
      <Container>
        <div className="flex flex-col gap-5 sm:max-w-2xl">
          <Heading level={1} size="2xl">
            Collections
          </Heading>
          <Text as="p" size="lg" tone="subtle">
            Explore curated Shopify collections presented in a premium, responsive grid.
          </Text>
        </div>

        {collections.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <Card variant="elevated" padding="lg" className="mt-10">
            <div className="flex flex-col gap-3">
              <Heading level={2} size="sm">
                No collections available
              </Heading>
              <Text as="p" size="sm" tone="subtle">
                The collection listing is currently empty. Check back once Shopify collections are available.
              </Text>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}
