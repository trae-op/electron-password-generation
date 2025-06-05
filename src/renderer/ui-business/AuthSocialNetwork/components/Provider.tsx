import { useState, useEffect, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";
import { TContext } from "../context/type";

export const Provider = ({ children }: TPropsProvider) => {
  const [isAuthenticated, setAuthenticated] =
    useState<TContext["isAuthenticated"]>(undefined);
  const [isStatusAuthenticated, setStatusAuthenticated] =
    useState<TContext["isStatusAuthenticated"]>(undefined);

  const logout = () => {
    setAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isStatusAuthenticated,
    }),
    [isAuthenticated, isStatusAuthenticated]
  );

  const actions = useMemo(
    () => ({
      setAuthenticated,
      logout,
      setStatusAuthenticated,
    }),
    [setAuthenticated, logout, setStatusAuthenticated]
  );

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
