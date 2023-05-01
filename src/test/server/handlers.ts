import { API_BASE_URL_GRAPH_QL } from "@/config";

import { AuthResponse, User } from "@/modules/auth";
import {
  GetPlansResponse,
  CompanyListResponse,
  CompanyStatsResponse,
} from "@/modules/companies/services/api/companies-api";
import { Company } from "@/modules/companies/services/entities";
import { RoleGroupsResponse } from "@/modules/settings/modules/roles/services/api";
import { graphql } from "msw";
import { delay } from "../test-utils";
import dayjs from "dayjs";

export const gqlMockClient = graphql.link(API_BASE_URL_GRAPH_QL);

let roleGroups = [
  {
    id: "1",
    name: "Sub admin",
    roles: [
      "user.users.can_manage",
      "user.users.manage_roles",
      "user_permissions.companies",
      "user_permissions.companies.can_see",
      "can_edit_company_contract",
    ],
  },
  {
    id: "2",
    name: "Analista de Usuários",
    roles: ["user.users.can_manage"],
  },
  {
    id: "3",
    name: "Escolar",
    roles: ["user_permissions.companies"],
  },
  {
    id: "4",
    name: "Analista de dashboard 5",
    roles: ["user.users.can_manage"],
  },
] as RoleGroupsResponse[];

const companies = Array.from(Array(200).keys()).map((item) => {
  const index = item + 1;
  const address =
    item === 0
      ? {
          city: "Indaiatuba",
          district: "Jd Sevilha",
          line1: "Rua Cezira Borsari Barnabé, número 100",
          line2: "CASA 01",
          state: "SP",
          zipCode: "13339-585",
        }
      : undefined;
  return {
    id: index.toString(),
    name: `Escola ${index}`,
    cnpj: `00.000.000/${index.toString().padStart(4, "0")}-00`,
    registeredAt: dayjs().toISOString(),
    systemName: `system-${index}`,
    legalRepresentative: "Nome da pessoa",
    // legalRepresentativeEmail: "",
    tax: index,
    billetType: "physical",
    address,
    days: [
      {
        monthDay: 2,
        percentage: 40,
      },
      {
        monthDay: 18,
        percentage: 60,
      },
    ],
  };
}) as Company[];

const user = {
  id: "user-id-1",
  name: "User",
  roles: roleGroups[0].roles,
} as User;

function paginate(array: Array<unknown>, skip: number, take: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice(skip, skip + take);
}

const authResponse = () =>
  ({
    token: "jwt_token",
    roles: roleGroups[0].roles,
    user,
  } as AuthResponse);

const handlers = [
  gqlMockClient.mutation("token", async (req, res, ctx) => {
    if (!req.variables.login) return;
    const { email, password } = req.variables.login;

    await delay();
    if (email === "teste@teste.com" && password === "123@Mudar") {
      return res(ctx.data({ token: authResponse() }));
    }

    return res(
      ctx.status(500),

      ctx.errors([
        {
          message: "Usuário ou senha inválidos",
          extensions: { code: "USER_NOT_FOUND" },
        },
      ]),
    );
  }),
  gqlMockClient.query("me", async (req, res, ctx) => {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return;

    await delay();
    return res(ctx.data({ me: authResponse() }));
  }),
  gqlMockClient.query("GetRoleGroups", async (req, res, ctx) => {
    await delay();
    return res(ctx.data(roleGroups));
  }),
  gqlMockClient.query("companies", async (req, res, ctx) => {
    if (!req.variables) return;
    const { skip, take = 5, cnpj, name } = req.variables;

    const filteredItems =
      cnpj || name
        ? companies.filter(
            (company) =>
              (name && company.name.includes(name)) ||
              (cnpj && company.cnpj.includes(cnpj)),
          )
        : companies;

    await delay();

    return res(
      ctx.data({
        companies: {
          items: paginate(filteredItems, skip, take),
          totalCount: filteredItems.length,
        },
      } as CompanyListResponse),
    );
  }),
  gqlMockClient.mutation("CreateRoleGroup", async (req, res, ctx) => {
    if (!req.variables) return;
    const { name, roles } = req.variables;

    await delay();
    roleGroups.push({ id: name, name, roles });

    return res(ctx.data(roleGroups));
  }),
  gqlMockClient.mutation("UpdateRoleGroup", async (req, res, ctx) => {
    if (!req.variables) return;
    const { id, name, roles } = req.variables;
    await delay();
    const index = roleGroups.findIndex((i) => i.id === id);
    if (index !== -1) {
      roleGroups[index] = { id, name, roles };
    }

    return res(ctx.data(roleGroups));
  }),
  gqlMockClient.mutation("DeleteRoleGroup", async (req, res, ctx) => {
    if (!req.variables) return;
    const { id } = req.variables;

    await delay();
    roleGroups = roleGroups.filter((group) => group.id != id);

    return res(ctx.data(roleGroups));
  }),
  gqlMockClient.mutation("addCompany", async (req, res, ctx) => {
    if (!req.variables) return;
    const { name, cnpj } = req.variables.company as Company;

    await delay();
    companies.push({ id: cnpj, name, cnpj });

    return res(ctx.data(companies));
  }),
  gqlMockClient.mutation("updateCompany", async (req, res, ctx) => {
    if (!req.variables) return;
    const company = req.variables.company as Company;
    await delay();

    const index = companies.findIndex((i) => i.id === company.id);
    if (index !== -1) {
      const currentCompany = companies[index];
      companies[index] = { ...currentCompany, ...company };
    }

    return res(ctx.data({}));
  }),
  gqlMockClient.query("company", async (req, res, ctx) => {
    if (!req.variables) return;
    const { id } = req.variables;

    await delay();
    const company = companies.find((item) => item.id == id);

    if (!company)
      return res(
        ctx.status(404, "NotFound"),
        ctx.data({ message: "", type: "NotFound" }),
      );

    return res(ctx.data({ company }));
  }),
  gqlMockClient.query("GetPlans", async (req, res, ctx) => {
    if (!req.variables) return;

    await delay();

    return res(
      ctx.data([
        {
          dueDate: "2023-03-06T21:12:11.332Z",
          overdue: 2,
          ownerDocument: "000.000.000-01",
          ownerName: "Joao",
          studentName: "João Junior",
          planDescription: "Descrição do plano aqui",
          id: "1",
          value: 1200.21,
        },
        {
          dueDate: "2023-03-06T21:12:11.332Z",
          overdue: 0,
          ownerDocument: "000.000.000-01",
          ownerName: "Maria",
          studentName: "Joe",
          planDescription: "Descrição do plano aqui",
          id: "2",
          value: 1200.21,
        },
      ] as GetPlansResponse),
    );
  }),
  gqlMockClient.query("companyStats", async (req, res, ctx) => {
    if (!req.variables) return;

    await delay();

    return res(
      ctx.data({
        companyStats: {
          defaultLoan: 12,
          planCount: 2,
          receivedValue: 9412,
          totalValue: 12923,
        },
      } as CompanyStatsResponse),
    );
  }),
];

export { handlers };
