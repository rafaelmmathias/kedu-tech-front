import { useMutationBase } from "@/services/core";
import { useQueryClient } from "@tanstack/react-query";
import {
  createRoleGroup,
  CreateRoleGroupRequest,
  RoleGroupsResponse,
} from "../api";

export const useCreateRoleGroup = () => {
  const queryClient = useQueryClient();
  return useMutationBase<RoleGroupsResponse, CreateRoleGroupRequest>(
    createRoleGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["role-groups"]);
      },
    },
  );
};
