import { useActionState, memo } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { SubmitButton } from "./SubmitButton";
import { useControl } from "../hooks/useControl";
import { useControlContext } from "../hooks/useControlContext";
import { CheckboxGenerateKey } from "./CheckboxGenerateKey";

export const Form = memo(() => {
  const { name } = useControlContext();
  const { handleTextInputChange, submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <TextField
          label="Resource name"
          variant="outlined"
          name="name"
          value={name}
          onChange={handleTextInputChange}
          fullWidth
        />

        <CheckboxGenerateKey />

        <SubmitButton />
      </Stack>
    </form>
  );
});
