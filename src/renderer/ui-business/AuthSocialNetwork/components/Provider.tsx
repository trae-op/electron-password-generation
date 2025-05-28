import { useState, useEffect, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";
import { TContext } from "../context/type";

export const Provider = ({ children }: TPropsProvider) => {
  const [isAuthenticated, setAuthenticated] =
    useState<TContext["isAuthenticated"]>(undefined);

  const logout = () => {
    localStorage.removeItem("isAuthenticatedFromLS");
    setAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      setAuthenticated,
      logout,
    }),
    [isAuthenticated]
  );

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
