import {
  MoreOutlined,
  PlusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Divider, Empty, Row, Space } from "kedu-tech-ui";
import { useRoleGroups } from "@/modules/settings";
import { AppGroupedRoles, GroupActions } from "./components";
import { PageHeader } from "@/ui/components";

const { Panel } = Collapse;

export const Roles = () => {
  const { data, isLoading } = useRoleGroups();

  return (
    <Space direction="vertical" style={{ display: "flex" }}>
      <PageHeader
        description="Gerencie quais ações os usuários com o cargo abaixo atribuído poderá
          executar de acordo com a sua função e a área do sistema:"
      >
        <GroupActions>
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Novo cargo
          </Button>
        </GroupActions>
      </PageHeader>

      <Divider />
      <Space direction="vertical" style={{ display: "flex" }}>
        <Row align={"middle"} justify="center">
          {isLoading && <SyncOutlined spin />}
        </Row>
        {data?.map((group, index) => {
          return (
            <Collapse size="small" key={`group-${group.name}-${index}`}>
              <Panel
                extra={
                  <GroupActions group={group}>
                    <MoreOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </GroupActions>
                }
                header={group.name}
                key={`panel-${group.name}-${index}`}
              >
                <AppGroupedRoles group={group} />
              </Panel>
            </Collapse>
          );
        })}

        {!isLoading && data?.length === 0 && (
          <Empty description="Nenhum cargo foi criado ainda, utilize o botão acima para começar." />
        )}
      </Space>
    </Space>
  );
};
