import { gqlRequest } from "@/services/infra";
import { PlanFilters, PlanRow, Company, CompanyStats } from "../entities";
import { createCompanyMutation, updateCompanyMutation } from "./mutations";
import { getCompanyQuery, getCompanyStatsQuery } from "./queries";
import { getPlansQuery } from "./queries/get-plans-query";
import { getCompaniesQuery } from "./queries/get-companies-query";

export interface CompanyList {
  items: Company[];
  totalCount: number;
}
export interface CompanyListResponse {
  companies: CompanyList;
}

export interface CompanyListRequest {
  skip: number;
  take: number;
  name?: string;
  cnpj?: string;
}

type GetCompanies = (params: CompanyListRequest) => Promise<CompanyList>;

export const getCompanies: GetCompanies = async (params: CompanyListRequest) => {

  const { companies } = await gqlRequest<
    CompanyListResponse,
    CompanyListRequest
  >(getCompaniesQuery, params);
  return companies;
};

type CreateCompanyRequest = { company: Company };
export const createCompany = (company: Company) =>
  gqlRequest<Company, CreateCompanyRequest>(createCompanyMutation, {
    company,
  });

export interface GetCompanyRequest {
  id: string;
}

export type GetCompanyResponse = { company: Company };

export const getCompany = (params: GetCompanyRequest) =>
  gqlRequest<GetCompanyResponse, GetCompanyRequest>(getCompanyQuery, params);

export type UpdateCompanyRequest = { company: Company };
export type UpdateCompanyResponse = Company;

export const updateCompany = (company: Company) =>
  gqlRequest<UpdateCompanyResponse, UpdateCompanyRequest>(updateCompanyMutation, {
    company,
  });

export interface GetPlansRequest {
  companyId?: string;
  filters?: PlanFilters;
}
export type GetPlansResponse = PlanRow[];

export const getPlans = (params: GetPlansRequest) =>
  gqlRequest<GetPlansResponse, GetPlansRequest>(getPlansQuery, params);

export interface CompanyStatsRequest {
  id?: string;
}
export type CompanyStatsResponse = { companyStats: CompanyStats };

export const getCompanyStats = (params: CompanyStatsRequest) =>
  gqlRequest<CompanyStatsResponse, CompanyStatsRequest>(
    getCompanyStatsQuery,
    params,
  );
