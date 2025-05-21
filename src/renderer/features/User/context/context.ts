import { createContext } from "react";
import type { TContext, TContextProfile } from "./type";

export const Context = createContext<TContext | undefined>(undefined);

export const ContextProfile = createContext<TContextProfile | undefined>(
  undefined
);
