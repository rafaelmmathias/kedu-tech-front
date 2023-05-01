import { Col, Row } from "kedu-tech-ui";

interface PageHeaderProps {
  description: string;
  children: React.ReactNode;
}
export const PageHeader: React.FC<PageHeaderProps> = ({
  description,
  children,
}) => {
  return (
    <Row align={"middle"} justify={{ xs: "end", md: "space-between" }}>
      <Col xs={24} sm={12}>
        {description}
      </Col>
      {children}
    </Row>
  );
};
