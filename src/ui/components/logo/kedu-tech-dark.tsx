import { theme } from "kedu-tech-ui";
import { SVGLogo } from "./svg-logo";

interface KeduTechDarkProps {
  width: number;
}

export const KeduTechDark: React.FC<KeduTechDarkProps> = ({ width }) => {
  const { useToken, defaultAlgorithm } = theme;
  const { token } = useToken();
  const lightTheme = defaultAlgorithm(token);

  const fillPrimaryColor = lightTheme.colorPrimaryBg;
  const fillSecondaryColor = lightTheme.colorPrimary;

  return (
    <SVGLogo
      width={width}
      primaryColor={fillPrimaryColor}
      secondaryColor={fillSecondaryColor}
    />
  );
};
