import { Card, CardProps, Typography } from "kedu-tech-ui";

type PageLayoutProps = CardProps & {
  children: React.ReactNode;
  title?: string;
};
export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  children,
  ...rest
}) => {
  return (
    <>
      {title && <Typography.Title level={2}>{title}</Typography.Title>}
      <Card style={{ minHeight: "calc(100vh - 195px)" }} {...rest}>
        {children}
      </Card>
    </>
  );
};
