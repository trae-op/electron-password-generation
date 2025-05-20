import { useState, useEffect, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const isAuthenticatedFromLS = localStorage.getItem("isAuthenticated");
  const [isAuthenticated, setAuthenticated] = useState(
    isAuthenticatedFromLS === "true"
  );

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
    setAuthenticated(isAuthenticatedFromLS === "true");
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
