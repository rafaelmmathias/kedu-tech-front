import { useCompanyStats } from "@/modules/companies/services";
import { currencyFormatter } from "@/services/app/formatters";
import { Card, Grid, Progress, StatsCard } from "kedu-tech-ui";
import { useMemo } from "react";

interface CompanyStatsProps {
  id: string;
}

export const CompanyStats: React.FC<CompanyStatsProps> = ({ id }) => {
  const { data, isLoading } = useCompanyStats({ id });
  const { md } = Grid.useBreakpoint();
  const stats = data?.companyStats;
  const isNotMediumScreen = md === false;

  const gridStyle: React.CSSProperties = useMemo(
    () => ({
      width: isNotMediumScreen ? "50%" : "25%",
      boxShadow: !isNotMediumScreen ? "none" : undefined,
    }),
    [isNotMediumScreen],
  );

  return (
    <Card>
      <Card.Grid style={gridStyle} hoverable={false}>
        <StatsCard
          title="Número de planos"
          value={stats?.planCount}
          loading={isLoading}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        <StatsCard
          title="Valor total em planos"
          value={currencyFormatter(stats?.totalValue)}
          loading={isLoading}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        <StatsCard
          title="Inadimplência"
          value={<Progress percent={stats?.defaultLoan} />}
          loading={isLoading}
        />
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false}>
        {data && (
          <StatsCard
            title="Valor recebido"
            value={currencyFormatter(stats?.receivedValue)}
            loading={isLoading}
          />
        )}
      </Card.Grid>
    </Card>
  );
};
