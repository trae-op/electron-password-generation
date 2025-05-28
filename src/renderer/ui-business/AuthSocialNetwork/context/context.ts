import { createContext } from "react";
import type { TContext } from "./type";

export const Context = createContext<TContext | undefined>(undefined);
