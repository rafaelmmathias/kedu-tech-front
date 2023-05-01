import { Outlet, Route, Routes } from "react-router-dom";

import { ForbiddenPage, NotFoundPage } from "@/ui/pages";
import { CompanyDetailsPage, CompanyCreate, CompanyList } from "../ui";
import { useAbility } from "@/services/app/abilities";

export const CompaniesRouter = () => {
  const permissions = useAbility();
  const canSeeCompanies = permissions.can("see", "companies");
  const canCreateCompanies = permissions.can("create", "companies");
  return (
    <Routes>
      <Route index element={<CompanyList />} />
      <Route
        element={
          canSeeCompanies ? (
            <>
              <CompanyList />
              <Outlet />
            </>
          ) : (
            <ForbiddenPage />
          )
        }
      >
        <Route
          path="create"
          element={canCreateCompanies ? <CompanyCreate /> : <ForbiddenPage />}
        />
      </Route>
      <Route
        path=":id"
        element={canSeeCompanies ? <CompanyDetailsPage /> : <ForbiddenPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
