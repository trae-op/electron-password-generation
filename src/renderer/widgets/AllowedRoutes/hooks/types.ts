import type { TRoutes } from "@config/types";

export type THookControl = {
  isMainRoute: (routers: TRoutes[keyof TRoutes][]) => boolean;
};
