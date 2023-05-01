import { APPGroupedRoles, Role } from "@/services/app/abilities";
import { List, Row, Space, Switch, Typography } from "kedu-tech-ui";
import { useUpdateRoleGroup } from "../../services";
import { RoleGroupsResponse } from "../../services/api";

interface AppGroupedRolesProps {
  group: RoleGroupsResponse;
}

export const AppGroupedRoles: React.FC<AppGroupedRolesProps> = ({ group }) => {
  const { mutateAsync: updateRoleGroup, isLoading } = useUpdateRoleGroup();

  const updateGroupRole = (checked: boolean, role: Role) => {
    let updatedArray = [...group.roles];
    if (checked) {
      updatedArray.push(role);
    } else {
      updatedArray = group.roles.filter((item) => item != role);
    }

    updateRoleGroup({
      ...group,
      roles: updatedArray,
    });
  };

  return (
    <Space direction="vertical" style={{ display: "flex" }}>
      {APPGroupedRoles.map((roleGroup, index) => {
        return (
          roleGroup.roles && (
            <List
              key={`${roleGroup.label}-${index}`}
              header={
                <Row justify={"space-between"}>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    {roleGroup.label}
                  </Typography.Title>
                </Row>
              }
              itemLayout="horizontal"
              dataSource={roleGroup.roles}
              renderItem={(role, index) => (
                <List.Item
                  actions={[
                    <Switch
                      key={`${role.label}-${index}`}
                      defaultChecked={group.roles.includes(role.role)}
                      onChange={(checked) => {
                        updateGroupRole(checked, role.role);
                      }}
                      loading={isLoading}
                    />,
                  ]}
                >
                  {role.label}
                </List.Item>
              )}
              size="small"
              bordered
            />
          )
        );
      })}
    </Space>
  );
};
