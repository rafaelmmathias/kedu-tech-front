import { Role } from "@/services/app/abilities";
import { gqlRequest } from "@/services/infra";
import { createRoleGroupMutation, updateRoleGroupMutation } from "./mutations";
import { deleteRoleGroupMutation } from "./mutations/delete-group-mutation";

import { getRoleGroupsQuery } from "./queries";

export type GetRoleGroupsParams = {
  token: string;
};

export type RoleGroupsResponse = {
  id: string;
  name: string;
  roles: Role[];
};

export const getRoleGroups = () =>
  gqlRequest<RoleGroupsResponse[]>(getRoleGroupsQuery);

export type CreateRoleGroupRequest = Omit<RoleGroupsResponse, "id">;

export const createRoleGroup = (newGroup: CreateRoleGroupRequest) =>
  gqlRequest<RoleGroupsResponse, CreateRoleGroupRequest>(
    createRoleGroupMutation,
    newGroup,
  );

export type DeleteRoleGroupRequest = RoleGroupsResponse;

export const deleteRoleGroup = (roleGroup: DeleteRoleGroupRequest) =>
  gqlRequest<RoleGroupsResponse, DeleteRoleGroupRequest>(
    deleteRoleGroupMutation,
    roleGroup,
  );

export type UpdateRoleGroupRequest = RoleGroupsResponse;

export const updateRoleGroup = (roleGroup: UpdateRoleGroupRequest) =>
  gqlRequest<RoleGroupsResponse, UpdateRoleGroupRequest>(
    updateRoleGroupMutation,
    roleGroup,
  );
