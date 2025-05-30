import { ChangeEvent, useCallback, useMemo } from "react";
import { useControlContextActions } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setName } = useControlContextActions();

  const handleAdd = useCallback(() => {
    window.electron.send.windowOpenAddResource();
  }, []);

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const name = formData.get("name");
      const key = formData.get("password");

      await window.electron.invoke.postResource({
        name,
        key,
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      handleAdd,
      submitFormAction,
      handleTextInputChange,
    }),
    [handleAdd, submitFormAction, handleTextInputChange]
  );

  return value;
};
