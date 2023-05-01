import { useMutationBase } from "@/services/core";
import { useQueryClient } from "@tanstack/react-query";
import {
  deleteRoleGroup,
  DeleteRoleGroupRequest,
  RoleGroupsResponse,
} from "../api";

export const useDeleteRoleGroup = () => {
  const queryClient = useQueryClient();
  return useMutationBase<RoleGroupsResponse, DeleteRoleGroupRequest>(
    deleteRoleGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["role-groups"]);
      },
    },
  );
};
