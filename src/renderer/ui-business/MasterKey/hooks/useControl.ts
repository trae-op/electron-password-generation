import { ChangeEvent, useCallback, useMemo } from "react";
import { useControlContextActions } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setKey } = useControlContextActions();

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKey(event.target.value);
    },
    []
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const key = formData.get("key") as string;

      await window.electron.invoke.postMasterKey({
        key,
      });
    },
    []
  );

  const handleDeleteMasterKey = useCallback(() => {
    window.electron.send.deleteMasterKey();
  }, []);

  const value = useMemo(
    () => ({
      submitFormAction,
      handleTextInputChange,
      handleDeleteMasterKey,
    }),
    [submitFormAction, handleTextInputChange, handleDeleteMasterKey]
  );

  return value;
};
