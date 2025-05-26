import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [name, setName] = useState("");

  const value = useMemo(
    () => ({
      setName,
      name,
    }),
    [name]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
