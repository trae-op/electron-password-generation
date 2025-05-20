import { memo, type ReactNode } from "react";
import { useSubscribeEvent } from "../hooks";

export const ContainerRoutes = memo(({ children }: { children: ReactNode }) => {
  useSubscribeEvent();

  return children;
});
