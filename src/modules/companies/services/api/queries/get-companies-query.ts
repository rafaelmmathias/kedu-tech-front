import { gql } from "graphql-request";

export const getCompaniesQuery = gql`
  query companies($skip: Int!, $take: Int!) {
    companies(skip: $skip, take: $take) {
      items {
        id
        name
        cnpj
      }
      totalCount
    }
  }
`;
