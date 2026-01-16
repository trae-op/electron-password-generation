import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [isUser, setUser] = useState<boolean | undefined>(undefined);
  const [isAuthenticated, setAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [isResources, setResources] = useState<boolean | undefined>(undefined);

  const value = useMemo(
    () => ({
      isUser,
      isAuthenticated,
      isResources,
    }),
    [isUser, isAuthenticated, isResources]
  );

  const actions = useMemo(
    () => ({
      setUser,
      setResources,
      setAuthenticated,
    }),
    [setUser, setAuthenticated, setResources]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
