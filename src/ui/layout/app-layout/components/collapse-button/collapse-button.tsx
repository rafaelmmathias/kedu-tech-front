import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { theme } from "kedu-tech-ui";

interface CollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}
export const CollapseButton: React.FC<CollapseButtonProps> = ({
  collapsed,
  onToggle,
}) => {
  const { useToken } = theme;
  const { token } = useToken();
  const Icon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  return (
    <Icon
      style={{ color: token.colorTextLightSolid, fontSize: "20px" }}
      onClick={onToggle}
    />
  );
};
