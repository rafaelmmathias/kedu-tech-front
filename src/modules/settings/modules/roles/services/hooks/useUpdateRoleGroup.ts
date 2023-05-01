import { useMutationBase } from "@/services/core";
import { useQueryClient } from "@tanstack/react-query";
import {
  RoleGroupsResponse,
  updateRoleGroup,
  UpdateRoleGroupRequest,
} from "../api";

export const useUpdateRoleGroup = () => {
  const queryClient = useQueryClient();
  return useMutationBase<RoleGroupsResponse, UpdateRoleGroupRequest>(
    updateRoleGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["role-groups"]);
        queryClient.invalidateQueries(["user"]);
      },
    },
  );
};
