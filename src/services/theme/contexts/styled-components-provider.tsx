import { ThemeProvider as SCThemeProvider } from "styled-components";
import { FloatButton, theme } from "kedu-tech-ui";
import { isDev } from "@/config";

interface StyledComponentsThemeProviderProps {
  children: React.ReactElement;
  setIsDark: () => void;
}

export const StyledComponentsThemeProvider: React.FC<
  StyledComponentsThemeProviderProps
> = ({ children, setIsDark }) => {
  const { token } = theme.useToken();

  return (
    <SCThemeProvider theme={token}>
      {children}
      {isDev() && <FloatButton onClick={setIsDark} />}
    </SCThemeProvider>
  );
};
