import { Navigate, Route, Routes } from "react-router-dom";
import { ForbiddenPage, NotFoundPage } from "@/ui/pages";
import { Roles, Users } from "@/modules/settings/modules";
import { Settings } from "@/modules/settings/ui";
import { useAbility } from "@/services/app/abilities";

export const SettingsRouter = () => {
  const permissions = useAbility();
  const canManageUser = permissions.can("manage", "settings.users");
  const canManageRoles = permissions.can("manage", "settings.roles");
  const canSeeConfig = permissions.can("see", "settings");

  return (
    <Routes>
      <Route index element={<Navigate to={"/settings/users"} />} />
      <Route element={canSeeConfig ? <Settings /> : <ForbiddenPage />}>
        <Route
          path="users"
          element={canManageUser ? <Users /> : <ForbiddenPage />}
        />
        <Route
          path="roles"
          element={canManageRoles ? <Roles /> : <ForbiddenPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
