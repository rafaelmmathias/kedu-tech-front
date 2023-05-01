import { gql } from "graphql-request";

export const getMeQuery = gql`
  query me {
    me {
      token
      user {
        id
        name
      }
      roles
    }
  }
`;
