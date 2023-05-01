export const themeStorage = {
  getTheme: () => {
    const theme = window.localStorage.getItem("theme");
    return theme ? JSON.parse(theme) : "light";
  },
  setTheme: (theme: string) =>
    window.localStorage.setItem("theme", JSON.stringify(theme)),
};
