import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { id } = useParams<{ id: string }>();
  const { setName } = useControlContextActions();
  const [isUpdateKey, setUpdateKey] = useState(false);

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

      if (name !== null) {
        await window.electron.invoke.putResource({
          id,
          name,
          ...(key !== null ? { key } : {}),
        });
      }
    },
    [id]
  );

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateKey(event.target.checked);
  };

  const value = useMemo(
    () => ({
      isUpdateKey,
      submitFormAction,
      handleCheckboxChange,
      handleTextInputChange,
    }),
    [submitFormAction, handleTextInputChange]
  );

  return value;
};
