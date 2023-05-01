import { useAbility } from "@/services/app/abilities";
import { BankOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu as UIMenu, MenuProps as UIMenuProps } from "kedu-tech-ui";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type MenuProps = UIMenuProps & {
  isCollapsed: boolean;
  offset?: number;
};

export const Menu: React.FC<MenuProps> = ({
  isCollapsed,
  offset = 60,
  ...rest
}) => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([
    ...location.pathname.split("/"),
  ]);

  /**
   * método para ser usado em menu com submenus: onTitleClick
   */
  // const onTitleClickHandler = (info: { key: string }) => {
  //   const items = openKeys.includes(info.key)
  //     ? openKeys.filter((key) => key !== info.key)
  //     : [...openKeys, info.key];
  //   setOpenKeys(items);
  // };

  const permissions = useAbility();

  const items = useMemo<UIMenuProps["items"]>(() => {
    const companiesMenu = {
      key: "companies",
      icon: <BankOutlined />,
      label: <Link to={"/schools"}>Escolas</Link>,
    };

    const config = {
      key: "settings",
      icon: <SettingOutlined />,
      danger: true,
      label: <Link to={"/settings"}>Configurações</Link>,
    };

    const items = [] as UIMenuProps["items"];

    const canManageApp = permissions.can("manage", "settings");
    const canSeeSettings = permissions.can("see", "settings");
    const canSeeCompanies = permissions.can("see", "companies");

    if (canSeeCompanies) items?.push(companiesMenu);
    if (canManageApp || canSeeSettings) items?.push(config);

    return items;
  }, [permissions]);

  useEffect(() => {
    const keys = location.pathname.split("/").filter((key) => key);
    setOpenKeys(keys.length > 0 ? keys : [""]);
  }, [location.pathname, isCollapsed]);

  return (
    <UIMenu
      mode="inline"
      selectedKeys={openKeys}
      openKeys={isCollapsed ? undefined : openKeys}
      defaultOpenKeys={openKeys}
      items={items}
      theme="dark"
      style={{
        maxHeight: `calc(100vh - ${offset}px)`,
        overflow: "auto",
        borderRight: "0",
      }}
      {...rest}
    />
  );
};
