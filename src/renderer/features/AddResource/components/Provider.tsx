import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [result, setResult] = useState<TResource>();
  const [name, setName] = useState("");

  const value = useMemo(
    () => ({
      setResult,
      setName,
      name,
      result,
    }),
    [name, result]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
