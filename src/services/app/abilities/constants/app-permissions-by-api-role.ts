import { DefinePermissions, Role, APIRoles } from "@/services/app/abilities";

export const appPermissionsByApiRole: Record<Role, DefinePermissions> = {
  [APIRoles.appAdmin](_, { can, cannot }) {
    can("manage", "all");
    cannot("manage", "system");
  },
  [APIRoles.sysAdmin](_, { can }) {
    can("manage", "all");
  },
  [APIRoles.manageUsers](_, { can }) {
    can("manage", "settings.users");
    can("see", "settings");
  },
  [APIRoles.manageRoles](_, { can }) {
    can("see", "settings");
    can("manage", "settings.roles");
  },
  [APIRoles.companies](_, { can }) {
    can("manage", "companies");
  },
  [APIRoles.companyManageOwners](_, { can }) {
    can("manage", "companies.manage.owners");
    can("see", "companies");
  },
  [APIRoles.createCompany](_, { can }) {
    can("see", "companies");
    can("create", "companies");
  },
  [APIRoles.seeCompanies](_, { can }) {
    can("see", "companies");
  },
  [APIRoles.seeCompanyContract](_, { can }) {
    can("see", "companies.contracts");
  },
  [APIRoles.editCompanyContract](_, { can }) {
    can("see", "companies.contracts");
    can("edit", "companies.contracts");
  },
};
