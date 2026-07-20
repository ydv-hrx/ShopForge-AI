import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { FeaturedCollection } from "@/services/shopify/collections";

type FeaturedCollectionsProps = {
  collections: FeaturedCollection[];
};

const collectionVisualVariants = [
  "bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.28),_transparent_48%),linear-gradient(135deg,_rgba(17,17,19,0.95),_rgba(69,69,74,0.72))]",
  "bg-[radial-gradient(circle_at_top,_rgba(0,102,204,0.22),_transparent_44%),linear-gradient(135deg,_rgba(31,31,35,0.94),_rgba(92,92,100,0.68))]",
  "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_42%),linear-gradient(135deg,_rgba(12,12,14,0.98),_rgba(43,43,48,0.75))]",
  "bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_46%),linear-gradient(135deg,_rgba(26,26,29,0.95),_rgba(77,77,82,0.7))]",
] as const;

function getCollectionVisualClassName(index: number) {
  return collectionVisualVariants[index % collectionVisualVariants.length];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="border-t border-border-subtle bg-background py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-5 sm:max-w-2xl">
          <Badge variant="subtle" size="md">
            Featured collections
          </Badge>
          <Heading level={2} size="xl">
            Curated collections with a premium storefront rhythm.
          </Heading>
          <Text as="p" size="lg" tone="subtle">
            A responsive collection grid built for editorial merchandising and a polished browsing experience.
          </Text>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((collection, index) => (
            <Card
              key={collection.id}
              variant="elevated"
              padding="none"
              className="group overflow-hidden"
            >
              <div className="flex h-full flex-col">
                <div
                  className={`relative min-h-40 overflow-hidden border-b border-border-subtle ${getCollectionVisualClassName(index)}`}
                >
                  {collection.image ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${collection.image.url})` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_transparent_55%)]" />
                  <div className="absolute left-4 top-4">
                    <Badge variant="accent" size="sm">
                      {collection.productsCount} products
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em] text-white/70">
                      Collection image placeholder
                    </Text>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                  <div className="space-y-3">
                    <Heading level={3} size="sm">
                      {collection.title}
                    </Heading>
                    <Text as="p" size="sm" tone="subtle">
                      {collection.description}
                    </Text>
                  </div>

                  <Button type="button" variant="secondary" size="md" className="mt-auto w-full">
                    Shop Collection
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
