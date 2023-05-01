import { Logo } from "@/ui/components";
import { Link } from "react-router-dom";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  Breadcrumb,
  Row,
  Button,
  Space,
  Divider,
  theme,
  AppLayout as AppLayoutUI,
} from "kedu-tech-ui";
import "antd/dist/reset.css";

import { Menu, UserMenu } from "./components";
import { useAuth } from "@/modules/auth";

interface AppLayoutProps {
  children: React.ReactElement;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { useToken } = theme;
  const { token } = useToken();
  const { logout } = useAuth();

  return (
    <AppLayoutUI
      onCollapse={(collapse) => setIsCollapsed(collapse)}
      logo={
        <Link to="/">
          <Logo width={65} theme="dark" />
        </Link>
      }
      userMenu={<UserMenu />}
      breadcrumb={
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined />
                </Link>
              ),
            },
          ]}
        />
      }
      menu={<Menu offset={270} isCollapsed={isCollapsed} />}
      mobileMenu={
        <Space direction="vertical" size="small">
          <Row justify={"center"}>
            <Space direction="vertical" align="center">
              <UserMenu />
              <Button onClick={logout} danger icon={<LogoutOutlined />}>
                Sair
              </Button>
            </Space>
          </Row>
          <Divider></Divider>
          <div
            style={{
              borderRadius: token.borderRadius,
              overflow: "hidden",
            }}
          >
            <Menu offset={270} isCollapsed={isCollapsed} theme={"light"} />
          </div>
        </Space>
      }
    >
      {children}
    </AppLayoutUI>
  );
};
