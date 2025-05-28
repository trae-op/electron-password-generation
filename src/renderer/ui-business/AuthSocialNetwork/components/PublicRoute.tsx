import { Navigate, Outlet } from "react-router-dom";
import { useControlContext } from "../hooks/useControlContext";

export const PublicRoute = () => {
  const { isAuthenticated } = useControlContext();
  if (isAuthenticated) {
    return <Navigate to="/window:main" replace />;
  }
  return <Outlet />;
};
