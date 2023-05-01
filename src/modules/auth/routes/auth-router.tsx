import { NotFoundPage } from "@/ui/pages";
import { Route, Routes } from "react-router-dom";
import { ForgotPassword, LoginPage } from "../ui/pages";
import { AuthRoutes } from "./auth-routes";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
