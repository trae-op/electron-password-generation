import { useCallback, useMemo } from "react";
import { THookControl } from "./types";
import { useControlContextActions } from "./useControlContext";

export const useControl = (id?: string): THookControl => {
  const { setCopyKeyResourceId } = useControlContextActions();
  const submitCopyKeyFormAction = useCallback(async (): Promise<undefined> => {
    if (id !== undefined) {
      const responce = await window.electron.invoke.copyMasterKey({
        id,
      });

      if (responce?.ok) {
        setCopyKeyResourceId(id);
      }
    }
  }, [id, setCopyKeyResourceId]);

  const value = useMemo(
    () => ({
      submitCopyKeyFormAction,
    }),
    [submitCopyKeyFormAction]
  );

  return value;
};
