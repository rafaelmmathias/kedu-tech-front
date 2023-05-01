import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@/modules/dashboard";
import { NotFoundPage } from "@/ui/pages";

export const DashboardRouter = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
