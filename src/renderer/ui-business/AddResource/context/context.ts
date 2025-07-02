import { createContext } from "react";
import type { TContext, TContextActions, TContextComponents } from "./type";

export const Context = createContext<TContext | undefined>(undefined);
export const ContextActions = createContext<TContextActions | undefined>(
  undefined
);

export const ContextComponents = createContext<TContextComponents | undefined>(
  undefined
);
