import { useState, useMemo, useCallback } from "react";
import isEqual from "lodash/isEqual";
import { Context, ContextActions } from "../context";
import type { TPropsProvider } from "./types";

export const Provider = ({ children }: TPropsProvider) => {
  const [list, setList] = useState<TResource[] | undefined>(undefined);

  const setItems = useCallback((items: TResource[]) => {
    setList((prevItems) => (isEqual(prevItems, items) ? prevItems : items));
  }, []);

  const value = useMemo(
    () => ({
      list,
    }),
    [list]
  );

  const actions = useMemo(
    () => ({
      setItems,
    }),
    [setItems]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
