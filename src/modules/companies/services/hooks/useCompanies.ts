import { useQueryBase } from "@/services/core";
import { getCompanies, CompanyList, CompanyListRequest } from "../api/companies-api";

export const useCompanies = (params: CompanyListRequest) => {
  return useQueryBase<CompanyList, CompanyListRequest>(
    "companies",
    getCompanies,
    params,
    { keepPreviousData: true },
  );
};
