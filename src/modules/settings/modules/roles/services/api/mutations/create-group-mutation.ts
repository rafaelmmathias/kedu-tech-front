import { gql } from "graphql-request";

export const createRoleGroupMutation = gql`
  mutation CreateRoleGroup($roleGroup: CreateGroup!) {
    createRoleGroup(roleGroup: $roleGroup) {
      name
      roles
    }
  }
`;
