import { gql } from "graphql-request";

export const getPlansQuery = gql`
  query GetPlans($companyId: Int!) {
    name
    cnpj
  }
`;
