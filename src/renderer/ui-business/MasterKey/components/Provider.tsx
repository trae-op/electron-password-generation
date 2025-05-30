import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [isMasterKey, setMasterKey] = useState(false);
  const [key, setKey] = useState("");

  const value = useMemo(
    () => ({
      isMasterKey,
      key,
    }),
    [isMasterKey, key]
  );

  const actions = useMemo(
    () => ({
      setMasterKey,
      setKey,
    }),
    [setMasterKey, setKey]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
