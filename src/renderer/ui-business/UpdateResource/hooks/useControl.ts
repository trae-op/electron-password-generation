import { ChangeEvent, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { id } = useParams<{ id: string }>();
  const { setName } = useControlContextActions();

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const name = formData.get("name") as string;
      const key = formData.get("password") as string;

      await window.electron.invoke.putResource({
        id,
        name,
        key,
      });
    },
    [id]
  );

  const value = useMemo(
    () => ({
      submitFormAction,
      handleTextInputChange,
    }),
    [submitFormAction, handleTextInputChange]
  );

  return value;
};
