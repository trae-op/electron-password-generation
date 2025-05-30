import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useIpc } from "../hooks/useIpc";
import { SubmitButton } from "./SubmitButton";
import { useControl } from "../hooks/useControl";

export const Form = () => {
  useIpc();
  const { handleTextInputChange, submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <TextField
          label="Master key"
          variant="outlined"
          name="key"
          onChange={handleTextInputChange}
          fullWidth
        />
        <SubmitButton />
      </Stack>
    </form>
  );
};
