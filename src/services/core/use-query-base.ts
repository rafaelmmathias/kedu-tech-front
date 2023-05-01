import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

export type ConfigOptions<T> = UseQueryOptions<T, Error, T>;

export function useQueryBase<T>(
  queryKey: string | null,
  fetcher: () => Promise<T>,
): UseQueryResult<T, Error>;

export function useQueryBase<T>(
  queryKey: string | null,
  fetcher: () => Promise<T>,
  params: null | undefined,
  config: ConfigOptions<T>,
): UseQueryResult<T, Error>;

export function useQueryBase<T, TParams extends object>(
  queryKey: string | null,
  fetcher: (params: TParams) => Promise<T>,
  params: TParams,
): UseQueryResult<T, Error>;

export function useQueryBase<T, TParams extends object>(
  queryKey: string | null,
  fetcher: (params: TParams) => Promise<T>,
  params: TParams,
  config: ConfigOptions<T>,
): UseQueryResult<T, Error>;

export function useQueryBase<T, TParams extends object>(
  queryKey: string | null,
  fetcher: (params?: TParams) => Promise<T>,
  params?: TParams,
  config?: ConfigOptions<T>,
) {
  const keys = params ? [queryKey, params] : [queryKey];

  const context = useQuery<T, Error, T>(keys, () => fetcher(params), {
    enabled: !!keys,
    ...config,
  });

  return context;
}
