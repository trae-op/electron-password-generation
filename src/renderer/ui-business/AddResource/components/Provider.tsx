import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [name, setName] = useState("");

  const value = useMemo(
    () => ({
      name,
    }),
    [name]
  );

  const actions = useMemo(
    () => ({
      setName,
    }),
    [setName]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
