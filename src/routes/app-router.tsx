import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./private-routes";
import { AuthProvider, AuthRouter } from "@/modules/auth";
import { DashboardRouter } from "@/modules/dashboard/routes";
import { SettingsRouter } from "@/modules/settings/routes";
import { NotFoundPage } from "@/ui/pages";
import { CompaniesRouter } from "@/modules/companies";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/*" element={<DashboardRouter />} />
          <Route path="/schools/*" element={<CompaniesRouter />} />
          <Route path="/settings/*" element={<SettingsRouter />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};
