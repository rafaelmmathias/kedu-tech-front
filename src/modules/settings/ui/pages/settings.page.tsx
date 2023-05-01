import { useAbility } from "@/services/app/abilities";
import { PageLayout } from "@/ui/layout";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Grid, Tabs } from "kedu-tech-ui";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const { useBreakpoint } = Grid;
export const Settings = () => {
  const params = useParams();
  const currentRoute = params["*"];
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const permissions = useAbility();
  const canManageUser = permissions.can("manage", "settings.users");
  const canManagePermissions = permissions.can("manage", "settings.roles");

  return (
    <PageLayout
      title={"Configurações"}
      bodyStyle={screens.lg ? { paddingLeft: 0 } : { paddingTop: 5 }}
    >
      <Tabs
        activeKey={currentRoute}
        onChange={(activeKey) => navigate(activeKey)}
        tabPosition={!screens.lg ? "top" : "left"}
        style={{ minHeight: "calc(100vh - 233px)" }}
        items={[
          {
            label: (
              <span>
                <UserOutlined />
                Usuários
              </span>
            ),
            key: "users",
            disabled: !canManageUser,
            children: <Outlet />,
          },
          {
            disabled: !canManagePermissions,
            label: (
              <span>
                <AppstoreOutlined />
                Cargos
              </span>
            ),
            key: "roles",
            children: <Outlet />,
          },
        ]}
      />
    </PageLayout>
  );
};
