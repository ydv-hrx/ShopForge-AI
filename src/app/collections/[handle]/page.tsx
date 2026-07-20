import { notFound } from "next/navigation";

import { CollectionHeader } from "@/components/collections/collection-header";
import { CollectionProductsGrid } from "@/components/collections/collection-products-grid";
import { getCollectionByHandle } from "@/services/shopify/collection";

type CollectionDetailPageProps = {
  params: {
    handle: string;
  };
};

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  return (
    <main>
      <CollectionHeader title={collection.title} description={collection.description} />
      <CollectionProductsGrid products={collection.products} />
    </main>
  );
}
