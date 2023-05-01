import { useQueryBase } from "@/services/core";
import {
  getCompany,
  GetCompanyRequest,
  GetCompanyResponse,
} from "../api/companies-api";

export const useCompany = (params: GetCompanyRequest) => {
  return useQueryBase<GetCompanyResponse, GetCompanyRequest>(
    "company",
    getCompany,
    params,
  );
};
