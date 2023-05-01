import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useMutationBase<T, ParamsT extends object>(
  fetcher: (params: ParamsT) => Promise<T>,
  options?: UseMutationOptions<T, Error, ParamsT>,
) {
  return useMutation<T, Error, ParamsT>(fetcher, options);
}
