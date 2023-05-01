import { useAuth } from "@/modules/auth";
import { AppLayout } from "@/ui/layout";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location }} />
  );
};
