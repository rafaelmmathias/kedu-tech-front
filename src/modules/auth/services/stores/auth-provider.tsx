import { AuthResponse } from "@/modules/auth";
import { AbilitiesProvider } from "@/services/app/abilities";
import { SessionLoader } from "@/ui/components";
import { useQueryClient } from "@tanstack/react-query";
import { message } from "kedu-tech-ui";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMe } from "../hooks";
import { authStorage } from "./auth-storage";

interface UserContextProps {
  auth?: AuthResponse;
  isAuthenticated: boolean;
  setAuth: (auth: AuthResponse) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthResponse>();

  useEffect(() => {
    if (auth && auth.token) {
      authStorage.setToken(auth.token);
      queryClient.removeQueries(["user", { token: "" }]);
    }
  }, [auth]);

  const { data, error, isLoading, isFetching } = useMe(
    authStorage.getToken() || auth?.token || "",
  );

  const queryClient = useQueryClient();
  const logout = useCallback(() => {
    setAuth(undefined);
    authStorage.clearToken();

    queryClient.removeQueries(["user"]);
  }, []);

  useEffect(() => {
    if (data) {
      setAuth({
        ...data,
        token: authStorage.getToken(),
      });
    }

    if (error) {
      message.warning("Sua sessão expirou, por favor faça login novamente.");
      logout();
    }
  }, [data, error]);

  useEffect(() => {
    addEventListener("storage", logout);

    return () => {
      removeEventListener("storage", logout);
    };
  }, []);

  const isAuthenticated = !!auth && !!auth.token;
  return (
    <UserContext.Provider value={{ auth, isAuthenticated, setAuth, logout }}>
      {isLoading && isFetching ? (
        <SessionLoader />
      ) : (
        <AbilitiesProvider>{children}</AbilitiesProvider>
      )}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  return context;
};
