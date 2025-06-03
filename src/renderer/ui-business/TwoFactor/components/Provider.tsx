import { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Context, ContextActions } from "../context";

export const Provider = () => {
  const [pending, setPending] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [base64, setBase64] = useState("");

  const value = useMemo(
    () => ({
      base64,
      pending,
      twoFactorCode,
    }),
    [pending, twoFactorCode, base64]
  );

  const actions = useMemo(
    () => ({
      setBase64,
      setPending,
      setTwoFactorCode,
    }),
    [setBase64, setPending, setTwoFactorCode]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        <Outlet />
      </ContextActions.Provider>
    </Context.Provider>
  );
};
