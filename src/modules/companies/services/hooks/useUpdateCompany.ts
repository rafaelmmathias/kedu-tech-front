import { useMutationBase } from "@/services/core";
import { useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "../api/companies-api";
import { Company } from "../entities";

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutationBase<Company, Company>(updateCompany, {
    onMutate: (company) => {
      queryClient.setQueryData(["company", { id: company.id }], { company });
    },
    onError: (_, company) => {
      queryClient.invalidateQueries(["company", { id: company.id }]);
    },
    onSuccess: (_, company) => {
      queryClient.invalidateQueries(["companies"]);

      queryClient.invalidateQueries(["company", { id: company.id }]);
    },
  });
};
