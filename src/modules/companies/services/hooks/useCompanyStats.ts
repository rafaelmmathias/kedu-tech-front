import { useQueryBase } from "@/services/core";
import {
  getCompanyStats,
  CompanyStatsRequest,
  CompanyStatsResponse,
} from "../api/companies-api";

export const useCompanyStats = (params: CompanyStatsRequest) => {
  return useQueryBase<CompanyStatsResponse, CompanyStatsRequest>(
    "company-stats",
    getCompanyStats,
    params,
  );
};
