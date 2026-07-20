type GraphQLErrorLocation = {
  line: number;
  column: number;
};

export type GraphQLError = {
  message: string;
  locations?: ReadonlyArray<GraphQLErrorLocation>;
  path?: ReadonlyArray<string | number>;
  extensions?: Record<string, unknown>;
};

export type GraphQLResponsePayload<TData> = {
  data?: TData;
  errors?: ReadonlyArray<GraphQLError>;
  extensions?: Record<string, unknown>;
};

export type GraphQLFetchOptions<
  TVariables extends Record<string, unknown> | undefined = undefined,
> = {
  endpoint: string;
  query: string;
  variables?: TVariables;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
};

export type GraphQLFetchResult<TData> =
  | {
      ok: true;
      status: number;
      data: TData;
      errors: [];
    }
  | {
      ok: false;
      status: number;
      data: TData | null;
      errors: ReadonlyArray<GraphQLError>;
      message: string;
    };

function createErrorResult<TData>({
  status,
  data,
  errors,
  message,
}: {
  status: number;
  data: TData | null;
  errors: ReadonlyArray<GraphQLError>;
  message: string;
}): GraphQLFetchResult<TData> {
  return {
    ok: false,
    status,
    data,
    errors,
    message,
  };
}

export async function graphqlFetch<
  TData,
  TVariables extends Record<string, unknown> | undefined = undefined,
>({
  endpoint,
  query,
  variables,
  headers,
  cache = "force-cache",
  revalidate = 900,
  tags,
}: GraphQLFetchOptions<TVariables>): Promise<GraphQLFetchResult<TData>> {
  const requestHeaders = new Headers(headers);

  requestHeaders.set("Content-Type", "application/json");

  const nextOptions =
    revalidate > 0 || (tags?.length ?? 0) > 0
      ? {
          revalidate,
          tags,
        }
      : undefined;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ query, variables }),
      cache,
      next: nextOptions,
    });

    const responseText = await response.text();

    let payload: GraphQLResponsePayload<TData> | null = null;

    if (responseText) {
      try {
        payload = JSON.parse(responseText) as GraphQLResponsePayload<TData>;
      } catch {
        return createErrorResult<TData>({
          status: response.status,
          data: null,
          errors: [],
          message: "GraphQL response was not valid JSON.",
        });
      }
    }

    const errors = payload?.errors ?? [];

    if (!response.ok) {
      return createErrorResult<TData>({
        status: response.status,
        data: payload?.data ?? null,
        errors,
        message:
          errors[0]?.message ??
          `GraphQL request failed with status ${response.status}.`,
      });
    }

    if (errors.length > 0) {
      return createErrorResult<TData>({
        status: response.status,
        data: payload?.data ?? null,
        errors,
        message: errors[0].message,
      });
    }

    if (!payload || payload.data === undefined) {
      return createErrorResult<TData>({
        status: response.status,
        data: null,
        errors: [],
        message: "GraphQL response did not include data.",
      });
    }

    return {
      ok: true,
      status: response.status,
      data: payload.data,
      errors: [],
    };
  } catch (error) {
    return createErrorResult<TData>({
      status: 0,
      data: null,
      errors: [],
      message:
        error instanceof Error
          ? error.message
          : "GraphQL request failed unexpectedly.",
    });
  }
}