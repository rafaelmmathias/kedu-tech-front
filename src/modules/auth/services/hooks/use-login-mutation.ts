import type { UserLogin, AuthResponse } from "@/modules/auth";
import { login } from "@/modules/auth";
import { useMutationBase } from "@/services/core";
import { useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutationBase<AuthResponse, UserLogin>(login, {
    onSuccess: (data) => {
      queryClient.setQueryData(["user", { token: data.token }], data);
    },
  });
};
