export const APIRoles = {
  appAdmin: "Admin",
  sysAdmin: "user_permissions.sys_admin",
  companies: "user_permissions.companies",
  companyManageOwners: "user_permissions.companies.manage_owners",
  manageUsers: "user.users.can_manage",
  manageRoles: "user.users.manage_roles",
  createCompany: "user_permissions.companies.create",
  seeCompanies: "user_permissions.companies.can_see",
  seeCompanyContract: "can_see_company_contract",
  editCompanyContract: "can_edit_company_contract",
} as const;
