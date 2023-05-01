import { useEffect, useState } from "react";
import { App, KeduUIConfigProvider } from "kedu-tech-ui";
import { StyledComponentsThemeProvider, themeStorage } from "@/services/theme";
import ptBR from "antd/locale/pt_BR";
interface UIThemeProviderProps {
  children: React.ReactElement;
}

export const UIThemeProvider: React.FC<UIThemeProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDark] = useState(themeStorage.getTheme() === "dark");

  useEffect(() => {
    themeStorage.setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <KeduUIConfigProvider
      locale={ptBR}
      isDarkMode={isDarkMode}
      token={{
        colorPrimary: "#3ac1f8",
        colorSuccess: "#12e049",
        blue9: "#001529",
      }}
    >
      <App>
        <StyledComponentsThemeProvider setIsDark={() => setIsDark(!isDarkMode)}>
          {children}
        </StyledComponentsThemeProvider>
      </App>
    </KeduUIConfigProvider>
  );
};
