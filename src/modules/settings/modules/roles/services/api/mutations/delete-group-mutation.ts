import { gql } from "graphql-request";

export const deleteRoleGroupMutation = gql`
  mutation DeleteRoleGroup($roleGroup: CreateGroup!) {
    deleteRoleGroup(roleGroup: $roleGroup) {
      name
      roles
    }
  }
`;
