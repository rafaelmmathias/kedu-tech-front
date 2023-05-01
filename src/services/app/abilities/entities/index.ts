import { User } from "@/modules/auth";
import { AbilityBuilder, MongoAbility, MongoQuery } from "@casl/ability";
import { APIRoles } from "../api/api-roles";

export type Role = (typeof APIRoles)[keyof typeof APIRoles];

export type AppRole = {
  label: string;
  role: Role;
};

export type AppRoleGroup = {
  label: string;
  roles?: AppRole[];
  role?: AppRole;
  subject: PossibleSubjects;
};

type CrudActions = "see" | "create" | "edit" | "delete" | "update";

type PureAbilityActions = CrudActions | "manage";

type PossibleSubjects =
  | "app"
  | "settings"
  | "companies"
  | "companies.manage.owners"
  | "companies.contracts"
  | "settings.users"
  | "settings.roles"
  | "system"
  | "all";

export type PossibleAbilities = [PureAbilityActions, PossibleSubjects];
export type AppAbility = MongoAbility<PossibleAbilities>;
export type DefinePermissions = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void;

export type Conditions = MongoQuery;
