import { AuthLayout } from "kedu-tech-ui";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Logo } from "@/ui/components";
import { useAuth } from "@/modules/auth";

type LocationProps = {
  state: {
    from: Location;
  };
};

export const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation() as unknown as LocationProps;
  const from = location.state?.from?.pathname || "/";

  return !isAuthenticated ? (
    <AuthLayout logo={<Logo />}>
      <Outlet />
    </AuthLayout>
  ) : (
    <Navigate to={from} />
  );
};
