"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { FeaturedCollection } from "@/services/shopify/collections";

type CollectionCardProps = {
  collection: FeaturedCollection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  const router = useRouter();

  return (
    <Card variant="elevated" padding="none" className="group overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="relative min-h-64 overflow-hidden border-b border-border-subtle bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_46%),linear-gradient(135deg,_rgba(16,16,18,0.96),_rgba(63,63,69,0.72))]">
          {collection.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${collection.image.url})` }}
              aria-hidden="true"
            />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_transparent_56%)]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <Text as="p" size="xs" tone="muted" className="uppercase tracking-[0.28em] text-white/70">
              Collection image placeholder
            </Text>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div className="space-y-3">
            <Heading level={2} size="sm">
              {collection.title}
            </Heading>
            <Text as="p" size="sm" tone="subtle">
              {collection.description}
            </Text>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="md"
            className="mt-auto w-full"
            onClick={() => {
              router.push(`/collections/${collection.handle}`);
            }}
          >
            View Collection
          </Button>
        </div>
      </div>
    </Card>
  );
}
