import { PlanRow as PlanRowType } from "@/modules/companies/services/entities";
import { currencyFormatter } from "@/services/app/formatters";
import { displayDate } from "@/services/app/formatters/date";
import {
  Badge,
  Card,
  Collapse,
  Descriptions,
  Grid,
  theme,
  Tooltip,
  Typography,
} from "kedu-tech-ui";
const { Panel } = Collapse;

interface PlanRowProps {
  plan: PlanRowType;
}
export const PlanRow: React.FC<PlanRowProps> = ({ plan }) => {
  const { useToken } = theme;
  const { token } = useToken();

  const { md } = Grid.useBreakpoint();
  const isNotMediumScreen = md === false;

  const planGridStyle: React.CSSProperties = {
    width: !isNotMediumScreen ? "30.5%" : "100%",
    textAlign: "center",
    boxShadow: !isNotMediumScreen ? "none" : undefined,
  };

  const overdueMessage = plan.overdue ? `${plan.overdue} vencida(s)` : "Em dia";
  return (
    <Badge.Ribbon
      text={<Tooltip title="Parcelas vencidas">{overdueMessage}</Tooltip>}
      color={plan.overdue > 0 ? "red" : "green"}
    >
      <Collapse bordered={false} style={{ background: token.colorBgContainer }}>
        <Panel
          key="1"
          header={
            <Card bordered={false} style={{ boxShadow: "none", padding: 0 }}>
              <Card.Grid
                style={{ ...planGridStyle, padding: 0 }}
                hoverable={false}
              >
                <Typography.Title level={5}>
                  {plan.studentName}
                </Typography.Title>
                {plan.planDescription}
              </Card.Grid>
              <Card.Grid
                style={{ ...planGridStyle, padding: 0 }}
                hoverable={false}
              >
                <Typography.Title level={5}>{plan.ownerName}</Typography.Title>
                {plan.ownerDocument}
              </Card.Grid>
              <Card.Grid
                style={{ ...planGridStyle, padding: 0 }}
                hoverable={false}
              >
                <Typography.Title level={5}>
                  Parcela: {currencyFormatter(plan.value)}
                </Typography.Title>
                Vencimento: {displayDate(plan.dueDate)}
              </Card.Grid>
            </Card>
          }
        >
          <Collapse
            bordered={false}
            // style={{ background: token.colorBgContainer }}
          >
            <Panel
              key="1.1"
              header={
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "none",
                    padding: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  <Card.Grid style={{ ...planGridStyle, padding: 0 }}>
                    <Typography.Title level={5}>
                      Parcela 1 de 12
                    </Typography.Title>
                    {currencyFormatter(1200.21)}
                  </Card.Grid>
                  <Card.Grid style={{ ...planGridStyle, padding: 0 }}>
                    <Typography.Title level={5}>
                      Linha digitável
                    </Typography.Title>
                    <Typography.Paragraph copyable ellipsis>
                      2334 3546546 4654 46546545 46468789 7
                    </Typography.Paragraph>
                  </Card.Grid>
                  <Card.Grid style={{ ...planGridStyle, padding: 0 }}>
                    <Typography.Title level={5}>Vencimento:</Typography.Title>
                    {displayDate(plan.dueDate)}
                  </Card.Grid>
                </Card>
              }
            >
              <Descriptions title="" bordered>
                <Descriptions.Item label="Product">
                  Cloud Database
                </Descriptions.Item>
                <Descriptions.Item label="Billing Mode">
                  Prepaid
                </Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">
                  YES
                </Descriptions.Item>
                <Descriptions.Item label="Order time">
                  2018-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                  2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                  <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">
                  $80.00
                </Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">
                  $60.00
                </Descriptions.Item>
                <Descriptions.Item label="Config Info">
                  Data disk type: MongoDB
                  <br />
                  Database version: 3.4
                  <br />
                  Package: dds.mongo.mid
                  <br />
                  Storage space: 10 GB
                  <br />
                  Replication factor: 3
                  <br />
                  Region: East China 1
                  <br />
                </Descriptions.Item>
              </Descriptions>
            </Panel>
            <Panel
              key="1.2"
              header={
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "none",
                    padding: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  <Card.Grid style={{ ...planGridStyle, padding: 0 }}>
                    <Typography.Title level={5}>
                      Parcela 2 de 12
                    </Typography.Title>
                  </Card.Grid>
                  <Card.Grid style={{ ...planGridStyle, padding: 0 }}>
                    <Typography.Title level={5}>
                      Linha digitável
                    </Typography.Title>
                    <Typography.Paragraph copyable ellipsis>
                      2334 3546546 4654 46546545 46468789 7
                    </Typography.Paragraph>
                  </Card.Grid>
                  <Card.Grid style={{ ...planGridStyle, padding: 0 }}>
                    <Typography.Title level={5}>Vencimento:</Typography.Title>
                    {displayDate(plan.dueDate)}
                  </Card.Grid>
                </Card>
              }
            >
              <Descriptions title="" bordered>
                <Descriptions.Item label="Product">
                  Cloud Database
                </Descriptions.Item>
                <Descriptions.Item label="Billing Mode">
                  Prepaid
                </Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">
                  YES
                </Descriptions.Item>
                <Descriptions.Item label="Order time">
                  2018-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                  2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                  <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">
                  $80.00
                </Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">
                  $60.00
                </Descriptions.Item>
                <Descriptions.Item label="Config Info">
                  Data disk type: MongoDB
                  <br />
                  Database version: 3.4
                  <br />
                  Package: dds.mongo.mid
                  <br />
                  Storage space: 10 GB
                  <br />
                  Replication factor: 3
                  <br />
                  Region: East China 1
                  <br />
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </Badge.Ribbon>
  );
};
