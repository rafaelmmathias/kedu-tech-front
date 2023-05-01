import { APIRoles, AppRoleGroup } from "@/services/app/abilities";

const systemAdminRole: AppRoleGroup = {
  label: "Master",
  subject: "system",
  role: { label: "Sys Admin", role: APIRoles.sysAdmin },
};

const adminRole: AppRoleGroup = {
  label: "Admin",
  subject: "app",
  role: { label: "Admin", role: APIRoles.appAdmin },
};

const companiesRoleGroup: AppRoleGroup = {
  label: "Escolas",
  subject: "companies",
  roles: [
    {
      label: "Gerenciar Escola",
      role: APIRoles.companies,
    },
    {
      label: "Visualizar Escolas",
      role: APIRoles.seeCompanies,
    },
    {
      label: "Cadastrar Escolas",
      role: APIRoles.createCompany,
    },
    {
      label: "Gerenciar Responsáveis",
      role: APIRoles.companyManageOwners,
    },
    {
      label: "Visualizar dados de contrato",
      role: APIRoles.seeCompanyContract,
    },
    {
      label: "Editar dados de contrato",
      role: APIRoles.editCompanyContract,
    },
  ],
};

const settingsRoleGroup: AppRoleGroup = {
  label: "Configurações",
  subject: "settings",
  roles: [
    {
      label: "Gerenciar usuários",
      role: APIRoles.manageUsers,
    },
    {
      label: "Gerenciar cargos",
      role: APIRoles.manageRoles,
    },
  ],
};

export const APPRoles = {
  systemAdminRole,
  adminRole,
  companiesRoleGroup,
  settingsRoleGroup,
};

export const APPGroupedRoles = Object.entries(APPRoles).map(([, role]) => role);
