import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useIpc } from "../hooks/useIpc";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { SubmitButton } from "./SubmitButton";
import { useControl } from "../hooks/useControl";
import { useControlContext } from "../hooks/useControlContext";
import { CheckboxUpdateKey } from "./CheckboxUpdateKey";

export const Form = () => {
  useIpc();
  const { result, name } = useControlContext();
  const { handleTextInputChange, submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  if (result === undefined) {
    return <LoadingSpinner />;
  }

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

        <CheckboxUpdateKey />

        <SubmitButton />
      </Stack>
    </form>
  );
};
