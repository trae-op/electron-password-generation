import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [list, setList] = useState<TResource[] | undefined>(undefined);

  const value = useMemo(
    () => ({
      list,
      setList,
    }),
    [list]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
