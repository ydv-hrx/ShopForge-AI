import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION, CART_LINES_REMOVE_MUTATION, CART_LINES_UPDATE_MUTATION } from "@/graphql/mutations/cart";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ShopifyCartImage = {
  import {
    CART_CREATE_MUTATION,
    CART_LINES_ADD_MUTATION,
    CART_LINES_REMOVE_MUTATION,
    CART_LINES_UPDATE_MUTATION,
  } from "@/graphql/mutations/cart";
  import { shopifyFetch } from "@/lib/shopify";

  type ShopifyMoneyV2 = {
    amount: string;
    currencyCode: string;
  };

  type ShopifyCartImage = {
    url: string;
    altText: string | null;
    width: number | null;
    height: number | null;
  } | null;

  type ShopifyCartMerchandise = {
    id: string;
    title: string;
    availableForSale: boolean;
    price: ShopifyMoneyV2;
    compareAtPrice: ShopifyMoneyV2 | null;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: ShopifyCartImage;
    };
  } | null;

  type ShopifyCartLineNode = {
    id: string;
    quantity: number;
    cost: {
      totalAmount: ShopifyMoneyV2;
    };
    merchandise: ShopifyCartMerchandise;
  } | null;

  type ShopifyCartResponse = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
      subtotalAmount: ShopifyMoneyV2;
      totalAmount: ShopifyMoneyV2;
    };
    lines: {
      edges: Array<{
        node: ShopifyCartLineNode;
      }>;
    };
  };

  type CartMutationUserError = {
    field: string[] | null;
    message: string;
  };

  type CartMutationPayload = {
    cart: ShopifyCartResponse | null;
    userErrors: CartMutationUserError[];
  };

  type CartCreateResponse = {
    cartCreate: CartMutationPayload;
  };

  type CartLinesAddResponse = {
    cartLinesAdd: CartMutationPayload;
  };

  type CartLinesUpdateResponse = {
    cartLinesUpdate: CartMutationPayload;
  };

  type CartLinesRemoveResponse = {
    cartLinesRemove: CartMutationPayload;
  };

  type CartMoney = {
    amount: string;
    currencyCode: string;
  };

  export type CartLine = {
    id: string;
    quantity: number;
    cost: {
      totalAmount: CartMoney;
    };
    merchandise: {
      id: string;
      title: string;
      availableForSale: boolean;
      price: CartMoney;
      compareAtPrice: CartMoney | null;
      product: {
        id: string;
        handle: string;
        title: string;
        featuredImage: {
          url: string;
          altText: string | null;
          width: number | null;
          height: number | null;
        } | null;
      };
    };
  };

  export type Cart = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
      subtotalAmount: CartMoney;
      totalAmount: CartMoney;
    };
    lines: CartLine[];
  };

  type CartLineInput = {
    merchandiseId: string;
    quantity: number;
  };

  type CartLineUpdateInput = {
    id: string;
    quantity: number;
  };

  function normalizeMoney(money: ShopifyMoneyV2): CartMoney {
    return {
      amount: money.amount,
      currencyCode: money.currencyCode,
    };
  }

  function normalizeImage(image: ShopifyCartImage) {
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

  function normalizeCart(cart: ShopifyCartResponse): Cart {
    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      cost: {
        subtotalAmount: normalizeMoney(cart.cost.subtotalAmount),
        totalAmount: normalizeMoney(cart.cost.totalAmount),
      },
      lines: cart.lines.edges
        .map((edge) => edge.node)
        .filter((line): line is ShopifyCartLineNode => line !== null)
        .filter(
          (line): line is ShopifyCartLineNode & {
            merchandise: NonNullable<ShopifyCartMerchandise>;
          } => line.merchandise !== null
        )
        .map((line) => ({
          id: line.id,
          quantity: line.quantity,
          cost: {
            totalAmount: normalizeMoney(line.cost.totalAmount),
          },
          merchandise: {
            id: line.merchandise.id,
            title: line.merchandise.title,
            availableForSale: line.merchandise.availableForSale,
            price: normalizeMoney(line.merchandise.price),
            compareAtPrice: line.merchandise.compareAtPrice
              ? normalizeMoney(line.merchandise.compareAtPrice)
              : null,
            product: {
              id: line.merchandise.product.id,
              handle: line.merchandise.product.handle,
              title: line.merchandise.product.title,
              featuredImage: normalizeImage(
                line.merchandise.product.featuredImage
              ),
            },
          },
        })),
    };
  }

  function getFriendlyCartError(operation: string, message: string) {
    return `Unable to ${operation} cart. ${message}`;
  }

  function normalizeMutationCart(
    payload: CartMutationPayload,
    operation: string
  ): Cart {
    if (payload.userErrors.length > 0) {
      throw new Error(getFriendlyCartError(operation, payload.userErrors[0].message));
    }

    if (!payload.cart) {
      throw new Error(getFriendlyCartError(operation, "No cart was returned."));
    }

    return normalizeCart(payload.cart);
  }

  export async function createCart(): Promise<Cart> {
    try {
      const response = await shopifyFetch<CartCreateResponse>({
        query: CART_CREATE_MUTATION,
        variables: {
          input: {
            lines: [],
          },
        },
      });

      if (!response.data) {
        throw new Error(getFriendlyCartError("create the", "The Shopify response was empty."));
      }

      return normalizeMutationCart(response.data.cartCreate, "create the");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(getFriendlyCartError("create the", error.message));
      }

      throw new Error(getFriendlyCartError("create the", "An unknown error occurred."));
    }
  }

  export async function addCartLines(
    cartId: string,
    lines: CartLineInput[]
  ): Promise<Cart> {
    try {
      const response = await shopifyFetch<CartLinesAddResponse>({
        query: CART_LINES_ADD_MUTATION,
        variables: {
          cartId,
          lines,
        },
      });

      if (!response.data) {
        throw new Error(getFriendlyCartError("add items to the", "The Shopify response was empty."));
      }

      return normalizeMutationCart(response.data.cartLinesAdd, "add items to the");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(getFriendlyCartError("add items to the", error.message));
      }

      throw new Error(getFriendlyCartError("add items to the", "An unknown error occurred."));
    }
  }

  export async function updateCartLines(
    cartId: string,
    lines: CartLineUpdateInput[]
  ): Promise<Cart> {
    try {
      const response = await shopifyFetch<CartLinesUpdateResponse>({
        query: CART_LINES_UPDATE_MUTATION,
        variables: {
          cartId,
          lines,
        },
      });

      if (!response.data) {
        throw new Error(getFriendlyCartError("update the", "The Shopify response was empty."));
      }

      return normalizeMutationCart(response.data.cartLinesUpdate, "update the");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(getFriendlyCartError("update the", error.message));
      }

      throw new Error(getFriendlyCartError("update the", "An unknown error occurred."));
    }
  }

  export async function removeCartLines(
    cartId: string,
    lineIds: string[]
  ): Promise<Cart> {
    try {
      const response = await shopifyFetch<CartLinesRemoveResponse>({
        query: CART_LINES_REMOVE_MUTATION,
        variables: {
          cartId,
          lineIds,
        },
      });

      if (!response.data) {
        throw new Error(getFriendlyCartError("remove items from the", "The Shopify response was empty."));
      }

      return normalizeMutationCart(response.data.cartLinesRemove, "remove items from the");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(getFriendlyCartError("remove items from the", error.message));
      }

      throw new Error(getFriendlyCartError("remove items from the", "An unknown error occurred."));
    }
  }
