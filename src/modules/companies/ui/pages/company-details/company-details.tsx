import { usePlans, useCompany } from "@/modules/companies/services";

import { Card, Col, Row, Skeleton, Space } from "kedu-tech-ui";
import { useParams } from "react-router-dom";

import {
  PlanFilterForm,
  PlanRow,
  PlansRowSkeleton,
  CompanyEditForm,
  CompanyStats,
} from "./components";
import { useFilters } from "@/services/core";
import { PlanFilters } from "@/modules/companies/services/entities";

export const CompanyDetailsPage = () => {
  const { id } = useParams();
  const { filters, onSubmitFilter } = useFilters<PlanFilters>();
  const { data, isLoading: loadingCompany } = useCompany({ id: id || "" });

  const {
    data: plans,
    isLoading,
    isFetching,
  } = usePlans({ filters, companyId: id });

  return (
    <>
      <Row gutter={10}>
        <Col xs={24} xl={18}>
          <Space direction="vertical" style={{ display: "flex" }}>
            {id && <CompanyStats id={id} />}
            <PlanFilterForm
              onFormSubmit={onSubmitFilter}
              isLoading={isFetching}
            />
            {isLoading && <PlansRowSkeleton />}
            {plans?.map((plan) => (
              <PlanRow key={`plan-${plan.id}`} plan={plan} />
            ))}
          </Space>
        </Col>

        <Col xs={24} xl={6}>
          {data && <CompanyEditForm company={data.company} />}
          {loadingCompany && (
            <Space direction="vertical" style={{ display: "flex" }}>
              <Card>
                <Skeleton.Input active />
              </Card>
              <Card>
                <Skeleton.Input active />
              </Card>
            </Space>
          )}
        </Col>
      </Row>
    </>
  );
};
