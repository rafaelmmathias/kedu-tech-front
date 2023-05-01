import { Result } from "kedu-tech-ui";

export const ForbiddenPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Você não tem autorização para acessar esta página."
    />
  );
};
