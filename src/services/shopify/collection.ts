import { COLLECTION_BY_HANDLE_QUERY } from "@/graphql/queries/collection";
import { shopifyFetch } from "@/lib/shopify";
import type { FeaturedProduct } from "./products";

type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
} | null;

type ShopifyCollectionProductNode = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2;
  } | null;
  availableForSale: boolean;
};

type ShopifyCollectionByHandleResponse = {
  collectionByHandle: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ShopifyImage;
    products: {
      edges: Array<{
        node: ShopifyCollectionProductNode | null;
      }>;
    };
  } | null;
};

export type CollectionDetail = {
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
  products: FeaturedProduct[];
};

function normalizeImage(image: ShopifyImage) {
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

function normalizeMoney(money: ShopifyMoneyV2) {
  return {
    amount: money.amount,
    currencyCode: money.currencyCode,
  };
}

function normalizeProduct(product: ShopifyCollectionProductNode): FeaturedProduct {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    featuredImage: normalizeImage(product.featuredImage),
    price: normalizeMoney(product.priceRange.minVariantPrice),
    compareAtPrice: product.compareAtPriceRange
      ? normalizeMoney(product.compareAtPriceRange.minVariantPrice)
      : null,
    availableForSale: product.availableForSale,
  };
}

export async function getCollectionByHandle(handle: string): Promise<CollectionDetail | null> {
  const response = await shopifyFetch<ShopifyCollectionByHandleResponse>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (!response.data || !response.data.collectionByHandle) {
    return null;
  }

  const collection = response.data.collectionByHandle;

  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: normalizeImage(collection.image),
    products: collection.products.edges
      .map((edge) => edge.node)
      .filter((product): product is ShopifyCollectionProductNode => product !== null)
      .map(normalizeProduct),
  };
}
