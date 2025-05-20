import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [pending, setPending] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const value = useMemo(
    () => ({
      pending,
      setPending,
      twoFactorCode,
      setTwoFactorCode,
    }),
    [pending, twoFactorCode]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
