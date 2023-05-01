import { gql } from "graphql-request";

export const updateCompanyMutation = gql`
  mutation updateCompany($company: CompanyDataInput!) {
    updateCompany(company: $company)
  }
`;
