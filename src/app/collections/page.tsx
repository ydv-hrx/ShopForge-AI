import { CollectionGrid } from "@/components/collections/collection-grid";
import { getFeaturedCollections } from "@/services/shopify/collections";

export default async function CollectionsPage() {
  const collections = await getFeaturedCollections();

  return <CollectionGrid collections={collections} />;
}
