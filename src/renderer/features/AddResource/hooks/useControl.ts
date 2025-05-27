import { ChangeEvent, useCallback } from "react";
import { useControlContext } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setName } = useControlContext();

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

      window.electron.send.postResource({
        name,
        key,
      });
    },
    []
  );

  return {
    handleAdd,
    submitFormAction,
    handleTextInputChange,
  };
};
