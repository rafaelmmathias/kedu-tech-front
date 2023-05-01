import { gql } from "graphql-request";

export const getCompanyStatsQuery = gql`
  query companyStats($id: Int!) {
    companyStats(id: $id) {
      planCount
      totalValue
      defaultLoan
      receivedValue
    }
  }
`;
