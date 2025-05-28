import { Navigate, Outlet } from "react-router-dom";
import { useControlContext as useControlContextAuth } from "@ui-business/AuthSocialNetwork";

export const PrivateRoute = () => {
  const { isAuthenticated } = useControlContextAuth();
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/sign-in" replace />;
};
