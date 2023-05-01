import { gql } from "graphql-request";

export const getCompanyQuery = gql`
  query company($id: Int!) {
    company(id: $id) {
      id
      name
      cnpj
      companyName
    }
  }
`;
