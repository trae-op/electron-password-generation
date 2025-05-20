import { useCallback } from "react";
import type { THookControl } from "./types";
import { useLocation } from "react-router-dom";
import { TRoutes } from "@config/types";

export const useControl = (): THookControl => {
  const location = useLocation();
  const isMainRoute = useCallback(
    (routers: TRoutes[keyof TRoutes][]) => {
      const pathname = location.pathname.substring(1);
      return routers.includes(pathname as TRoutes[keyof TRoutes]);
    },
    [location.pathname]
  );

  return {
    isMainRoute,
  };
};
