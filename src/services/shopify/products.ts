import { PRODUCTS_QUERY } from "@/graphql/queries/products";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ShopifyProductImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
} | null;

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyProductImage;
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2;
  } | null;
  availableForSale: boolean;
};

type ShopifyProductsResponse = {
  products: {
    edges: Array<{
      node: ShopifyProductNode | null;
    }>;
  };
};

export type FeaturedProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  } | null;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  availableForSale: boolean;
};

function normalizeProductImage(image: ShopifyProductImage) {
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

function normalizeProduct(product: ShopifyProductNode): FeaturedProduct {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    featuredImage: normalizeProductImage(product.featuredImage),
    price: normalizeMoney(product.priceRange.minVariantPrice),
    compareAtPrice: product.compareAtPriceRange
      ? normalizeMoney(product.compareAtPriceRange.minVariantPrice)
      : null,
    availableForSale: product.availableForSale,
  };
}

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  const response = await shopifyFetch<ShopifyProductsResponse>({
    query: PRODUCTS_QUERY,
  });

  if (!response.data) {
    throw new Error("Shopify products response did not include data.");
  }

  return response.data.products.edges
    .map((edge) => edge.node)
    .filter((product): product is ShopifyProductNode => Boolean(product))
    .map(normalizeProduct);
}
