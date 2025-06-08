import { useState, useMemo, useCallback } from "react";
import isEqual from "lodash.isequal";
import { Context, ContextActions } from "../context";
import type { TPropsProvider } from "./types";

export const Provider = ({
  children,
  isMasterKey = false,
  isDisabledActions = false,
}: TPropsProvider) => {
  const [list, setList] = useState<TResource[] | undefined>(undefined);
  const [copyKeyResourceId, setCopyKeyResourceId] = useState<
    string | undefined
  >(undefined);

  const setItems = useCallback((items: TResource[]) => {
    setList((prevItems) => (isEqual(prevItems, items) ? prevItems : items));
  }, []);

  const value = useMemo(
    () => ({
      list,
      isMasterKey,
      isDisabledActions,
      copyKeyResourceId,
    }),
    [list, isMasterKey, copyKeyResourceId, isDisabledActions]
  );

  const actions = useMemo(
    () => ({
      setItems,
      setCopyKeyResourceId,
    }),
    [setItems, setCopyKeyResourceId]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
