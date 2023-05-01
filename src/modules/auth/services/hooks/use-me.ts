import { useQueryBase } from "@/services/core";
import { AuthResponse, getMe } from "@/modules/auth";

export const useMe = (token: string) => {
  return useQueryBase<AuthResponse, { token: string }>(
    "user",
    getMe,
    { token },
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
      staleTime: 500,
    },
  );
};
