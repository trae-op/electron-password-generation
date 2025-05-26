import { ChangeEvent, useCallback } from "react";
import { useControlContext } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setName } = useControlContext();

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const name = formData.get("name") as string;
      const password = formData.get("password") as string;
      const range = formData.get("range") as string;
      const numbers = formData.get("numbers") as string;
      const uppercase = formData.get("uppercase") as string;
      const special = formData.get("special") as string;

      console.log({
        name,
        password,
        range,
        numbers,
        uppercase,
        special,
      });
    },
    []
  );

  return {
    submitFormAction,
    handleTextInputChange,
  };
};
