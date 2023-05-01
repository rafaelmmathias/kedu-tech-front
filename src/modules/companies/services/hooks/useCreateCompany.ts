import { useMutationBase } from "@/services/core";
import { useQueryClient } from "@tanstack/react-query";
import { createCompany } from "../api/companies-api";
import { Company } from "../entities";

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutationBase<Company, Company>(createCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
  });
};
