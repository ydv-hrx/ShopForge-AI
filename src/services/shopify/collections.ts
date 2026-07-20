import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/graphql/queries/collections";

type ShopifyCollectionImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
} | null;

type ShopifyCollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyCollectionImage;
  productsCount: number;
};

type ShopifyCollectionsResponse = {
  collections: {
    edges: Array<{
      node: ShopifyCollectionNode | null;
    }>;
  };
};

export type FeaturedCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: {
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  } | null;
  productsCount: number;
};

function normalizeCollectionImage(image: ShopifyCollectionImage) {
  if (!image) {
    return null;
  }

  return {
    url: image.url,
    altText: image.altText,
    width: image.width,
    height: image.height,
  };
}

function normalizeCollection(collection: ShopifyCollectionNode): FeaturedCollection {
  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: normalizeCollectionImage(collection.image),
    productsCount: collection.productsCount,
  };
}

export async function getFeaturedCollections(): Promise<FeaturedCollection[]> {
  const response = await shopifyFetch<ShopifyCollectionsResponse>({
    query: COLLECTIONS_QUERY,
  });

  if (!response.data) {
    throw new Error("Shopify collections response did not include data.");
  }

  return response.data.collections.edges
    .map((edge) => edge.node)
    .filter((collection): collection is ShopifyCollectionNode => Boolean(collection))
    .map(normalizeCollection);
}
