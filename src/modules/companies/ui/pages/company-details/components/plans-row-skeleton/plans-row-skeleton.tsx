import { Card, Skeleton, Space } from "kedu-tech-ui";

export const PlansRowSkeleton = () => (
  <>
    {Array.from(Array(7).keys()).map((value) => (
      <Card key={`plan-skeleton-${value}`}>
        <Space direction="vertical" style={{ display: "flex" }}>
          <Skeleton.Input active={true} />
          <Skeleton.Input active={true} block />
        </Space>
      </Card>
    ))}
  </>
);
