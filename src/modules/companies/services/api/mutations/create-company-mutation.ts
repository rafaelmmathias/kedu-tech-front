import { gql } from "graphql-request";

export const createCompanyMutation = gql`
  mutation addCompany($company: CompanyDataInput!) {
    addCompany(company: $company)
  }
`;
