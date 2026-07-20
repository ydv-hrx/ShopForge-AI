import { PRODUCT_BY_HANDLE_QUERY } from "@/graphql/queries/product";
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

type ShopifyProductImageNode = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type ShopifyProductByHandleResponse = {
  productByHandle: {
    id: string;
    handle: string;
    title: string;
    vendor: string;
    productType: string;
    description: string;
    availableForSale: boolean;
    featuredImage: ShopifyImage;
    images: {
      edges: Array<{
        node: ShopifyProductImageNode | null;
      }>;
    };
    priceRange: {
      minVariantPrice: ShopifyMoneyV2;
    };
    compareAtPriceRange: {
      minVariantPrice: ShopifyMoneyV2;
    } | null;
  } | null;
};

type ShopifyProductImageEdges = Array<{
  node: ShopifyProductImageNode | null;
}>;

export type ProductDetail = FeaturedProduct & {
  vendor: string;
  productType: string;
  description: string;
  images: Array<{
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  }>;
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

function normalizeImages(edges: ShopifyProductImageEdges) {
  return edges
    .map((edge) => edge.node)
    .filter(
      (image: ShopifyProductImageNode | null): image is ShopifyProductImageNode =>
        Boolean(image)
    )
    .map((image: ShopifyProductImageNode) => ({
      url: image.url,
      altText: image.altText,
      width: image.width,
      height: image.height,
    }));
}

export async function getProductByHandle(
  handle: string
): Promise<ProductDetail | null> {
  const response = await shopifyFetch<ShopifyProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (!response.data || !response.data.productByHandle) {
    return null;
  }

  const product = response.data.productByHandle;
  const featuredImage = normalizeImage(product.featuredImage);
  const images = normalizeImages(product.images.edges);

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    featuredImage,
    price: normalizeMoney(product.priceRange.minVariantPrice),
    compareAtPrice: product.compareAtPriceRange
      ? normalizeMoney(product.compareAtPriceRange.minVariantPrice)
      : null,
    availableForSale: product.availableForSale,
    vendor: product.vendor,
    productType: product.productType,
    description: product.description,
    images: images.length > 0 ? images : featuredImage ? [featuredImage] : [],
  };
}
