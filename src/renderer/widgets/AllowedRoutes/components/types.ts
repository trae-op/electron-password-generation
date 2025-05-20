import type { TRoutes } from "../../../config/types";

export interface TPropsContainer {
  children: React.ReactNode;
  routes: TRoutes[keyof TRoutes][];
}
