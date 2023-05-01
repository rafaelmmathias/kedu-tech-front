import { gql } from "graphql-request";

export const loginMutation = gql`
  mutation token($login: LoginDataInput!) {
    token(login: $login) {
      token
      user {
        id
        name
      }
      roles
    }
  }
`;
