import { useAbility } from "@/services/app/abilities";
import { useFilters } from "@/services/core";
import { PageHeader } from "@/ui/components";
import { PageLayout } from "@/ui/layout";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Divider } from "kedu-tech-ui";

import { useNavigate } from "react-router-dom";
import { useCompanies } from "@/modules/companies/services";
import { FilterForm, CompaniesFormFilter, CompaniesTable } from "./components";

export const CompanyList = () => {
  const navigate = useNavigate();

  const { page, skip, setPage, filters, onSubmitFilter, pageSize } =
    useFilters<CompaniesFormFilter>();

  const permissions = useAbility();
  const canCreateCompanies = permissions.can("create", "companies");
  const canSeeCompanies = permissions.can("see", "companies");

  const { data, isFetching } = useCompanies({
    skip,
    take: pageSize,
    ...filters,
  });

  return (
    <PageLayout title={"Escolas"}>
      <PageHeader description="Post votum promissa memini cuius adeptione cupis; quem pollicitus est aversione aversi et fuga. Qui autem de re desit libido frustra miseri qui incurrit odium sui obiecti.">
        {canCreateCompanies && (
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => navigate("create")}
          >
            Nova escola
          </Button>
        )}
      </PageHeader>

      <Divider />
      <FilterForm onSubmitFilter={onSubmitFilter} isLoading={isFetching} />
      <Divider />

      {canSeeCompanies && data && (
        <CompaniesTable
          loading={isFetching}
          current={page}
          pageSize={pageSize}
          total={data.totalCount}
          onChange={(page) => setPage(page)}
          data={data.items}
        />
      )}
    </PageLayout>
  );
};
