import { useQueryBase } from "@/services/core";
import {
  getPlans,
  GetPlansRequest,
  GetPlansResponse,
} from "../api/companies-api";

export const usePlans = (params: GetPlansRequest) => {
  return useQueryBase<GetPlansResponse, GetPlansRequest>(
    "plans",
    getPlans,
    params,
    {
      enabled: !!params.companyId,
    },
  );
};
