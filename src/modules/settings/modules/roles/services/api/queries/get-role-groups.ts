import { gql } from "graphql-request";

export const getRoleGroupsQuery = gql`
  query GetRoleGroups {
    name
    roles
  }
`;
