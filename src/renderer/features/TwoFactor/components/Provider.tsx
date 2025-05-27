import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [pending, setPending] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [base64, setBase64] = useState("");

  const value = useMemo(
    () => ({
      base64,
      pending,
      setBase64,
      setPending,
      twoFactorCode,
      setTwoFactorCode,
    }),
    [pending, twoFactorCode, base64]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
