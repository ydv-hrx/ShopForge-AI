import { ShopifyResponse } from "@/types/shopify";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-07";

const endpoint = domain
  ? `https://${domain}/api/${apiVersion}/graphql.json`
  : "";

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate = 900,
}: ShopifyFetchParams): Promise<ShopifyResponse<T>> {
  if (!domain || !accessToken) {
    throw new Error(
      "Missing Shopify environment variables. Check your .env.local file."
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache,
      next: {
        revalidate,
      },
      signal: controller.signal,
    });

    const json: ShopifyResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(
        json.errors?.[0]?.message ??
          `Shopify request failed with status ${response.status}`
      );
    }

    if (json.errors && json.errors.length > 0) {
      throw new Error(json.errors[0].message);
    }

    return json;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Shopify request timed out.");
      }

      throw new Error(error.message);
    }

    throw new Error("Unknown Shopify error.");
  } finally {
    clearTimeout(timeout);
  }
}