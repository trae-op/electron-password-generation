import { ChangeEvent, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useControlContext } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { id } = useParams<{ id: string }>();
  const { setName, setOpenCreateNewPassword } = useControlContext();

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const handleCheckedChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setOpenCreateNewPassword(event.target.checked);
    },
    []
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const name = formData.get("name") as string;
      const key = formData.get("password") as string;

      window.electron.send.putResource({
        id,
        name,
        key,
      });
    },
    [id]
  );

  return {
    submitFormAction,
    handleCheckedChange,
    handleTextInputChange,
  };
};
