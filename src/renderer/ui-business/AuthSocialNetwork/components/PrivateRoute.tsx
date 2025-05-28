import { Navigate, Outlet } from "react-router-dom";
import { useControlContext } from "../hooks/useControlContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useControlContext();
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/sign-in" replace />;
};
