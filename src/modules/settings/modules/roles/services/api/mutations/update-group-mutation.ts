import { gql } from "graphql-request";

export const updateRoleGroupMutation = gql`
  mutation UpdateRoleGroup($roleGroup: UpdateGroup!) {
    updateRoleGroup(roleGroup: $roleGroup) {
      name
      roles
    }
  }
`;
