import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context } from "../context";

export const Provider = ({ children }: TPropsProvider) => {
  const [result, setResult] = useState<TResource>();
  const [name, setName] = useState("");
  const [openCreateNewPassword, setOpenCreateNewPassword] = useState(false);

  const value = useMemo(
    () => ({
      setResult,
      setName,
      name,
      result,
      openCreateNewPassword,
      setOpenCreateNewPassword,
    }),
    [name, result, openCreateNewPassword]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
