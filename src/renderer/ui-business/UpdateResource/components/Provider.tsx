import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions, ContextComponents } from "../context";

export const Provider = ({
  children,
  renderGenerateCharacters,
}: TPropsProvider) => {
  const [result, setResult] = useState<TResource>();
  const [name, setName] = useState("");
  const [openCreateNewPassword, setOpenCreateNewPassword] = useState(false);

  const value = useMemo(
    () => ({
      name,
      result,
      openCreateNewPassword,
    }),
    [name, result, openCreateNewPassword]
  );

  const actions = useMemo(
    () => ({
      setResult,
      setName,
      setOpenCreateNewPassword,
    }),
    [setResult, setName, setOpenCreateNewPassword]
  );

  const components = useMemo(
    () => ({
      renderGenerateCharacters,
    }),
    [renderGenerateCharacters]
  );

  return (
    <ContextComponents.Provider value={components}>
      <Context.Provider value={value}>
        <ContextActions.Provider value={actions}>
          {children}
        </ContextActions.Provider>
      </Context.Provider>
    </ContextComponents.Provider>
  );
};
