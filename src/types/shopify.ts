export interface ShopifyConfig {
  domain: string;
  accessToken: string;
  apiVersion: string;
}

export interface ShopifyStorefrontPrimaryDomain {
  url: string;
  host: string;
}

export interface ShopifyStorefrontShop {
  name: string;
  description: string;
  primaryDomain: ShopifyStorefrontPrimaryDomain | null;
}

export interface ShopifyStorefrontConnectionQueryData {
  shop: ShopifyStorefrontShop;
}

export interface ShopifyConnectionSummary {
  shopName: string;
  primaryDomainUrl: string | null;
  primaryDomainHost: string | null;
}

export type ShopifyRequestStatus = "idle" | "loading" | "success" | "error";

export interface ShopifyRequestError {
  message: string;
  details?: string;
}

export interface ShopifyAsyncState<T> {
  status: ShopifyRequestStatus;
  data: T | null;
  error: ShopifyRequestError | null;
}

export type ShopifyResponse<T> =
  | {
      ok: true;
      status: number;
      data: T;
      errors: [];
    }
  | {
      ok: false;
      status: number;
      data: T | null;
      errors: ReadonlyArray<{
        message: string;
        locations?: ReadonlyArray<{ line: number; column: number }>;
        path?: ReadonlyArray<string | number>;
        extensions?: Record<string, unknown>;
      }>;
      message: string;
    };
