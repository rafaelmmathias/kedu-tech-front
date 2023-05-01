import { theme } from "kedu-tech-ui";
import { SVGLogo } from "./svg-logo";

interface KeduTechLightProps {
  width: number;
}

export const KeduTechLight: React.FC<KeduTechLightProps> = ({ width }) => {
  const { useToken, darkAlgorithm } = theme;
  const { token } = useToken();
  const darkTheme = darkAlgorithm(token);

  const fillPrimaryColor = darkTheme.colorPrimaryBg;
  const fillSecondaryColor = darkTheme.colorPrimary;

  return (
    <SVGLogo
      width={width}
      primaryColor={fillPrimaryColor}
      secondaryColor={fillSecondaryColor}
    />
  );
};
