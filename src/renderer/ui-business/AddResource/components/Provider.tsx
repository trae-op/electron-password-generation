import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions, ContextComponents } from "../context";

export const Provider = ({
  children,
  renderGenerateCharacters,
}: TPropsProvider) => {
  const [name, setName] = useState("");

  const value = useMemo(
    () => ({
      name,
    }),
    [name]
  );

  const actions = useMemo(
    () => ({
      setName,
    }),
    [setName]
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
