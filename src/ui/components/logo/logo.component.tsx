import { Row, theme as themeUI } from "kedu-tech-ui";
import { KeduTechDark } from "./kedu-tech-dark";
import { KeduTechLight } from "./kedu-tech-light";

const LIGHT_THEME_INDEX = 0;
const DARK_THEME_INDEX = 1;
const DEFAULT_WIDTH = 175;

interface LogoProps {
  width?: number;
  theme?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({ width = DEFAULT_WIDTH, theme }) => {
  const { useToken } = themeUI;
  const themes = [KeduTechLight, KeduTechDark];
  const themesMap = { light: LIGHT_THEME_INDEX, dark: DARK_THEME_INDEX };

  const {
    theme: { id },
  } = useToken();

  let ThemedLogo = themes[id] || KeduTechDark;

  if (theme) {
    ThemedLogo = themes[themesMap[theme]];
  }

  return (
    <Row justify={"center"}>
      <ThemedLogo width={width} />
    </Row>
  );
};
