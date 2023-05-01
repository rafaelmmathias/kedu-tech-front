export const authStorage = {
  getToken: () => {
    const token = window.localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  },
  setToken: (token: string) =>
    window.localStorage.setItem("token", JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem("token"),
};
