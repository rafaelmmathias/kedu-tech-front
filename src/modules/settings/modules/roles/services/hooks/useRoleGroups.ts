import { useQueryBase } from "@/services/core";
import { getRoleGroups, RoleGroupsResponse } from "../api";

export const useRoleGroups = () => {
  return useQueryBase<RoleGroupsResponse[]>("role-groups", getRoleGroups);
};
