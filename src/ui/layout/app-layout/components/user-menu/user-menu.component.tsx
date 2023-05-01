import { useAuth } from "@/modules/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "kedu-tech-ui";
import { UserAvatar } from "./user-menu.styles";

export const UserMenu = () => {
  const { logout, auth } = useAuth();

  const itemsMenuUser: MenuProps["items"] = [
    {
      key: "4",
      danger: true,
      icon: <LogoutOutlined />,
      label: "sair",
      onClick: logout,
    },
  ];

  return (
    <Dropdown
      arrow
      align={{
        targetOffset: [0, 5],
      }}
      trigger={["click"]}
      menu={{ items: itemsMenuUser }}
    >
      <UserAvatar size="large" alt="user">
        {auth?.user.name}
      </UserAvatar>
    </Dropdown>
  );
};
