import { useActionState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useIpc } from "../hooks/useIpc";
import { SubmitButton } from "./SubmitButton";
import { useControl } from "../hooks/useControl";
import { useControlContext } from "../hooks/useControlContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Form = () => {
  useIpc();
  const { handleTextInputChange, submitFormAction, handleDeleteMasterKey } =
    useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);
  const { isMasterKey } = useControlContext();

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={2}>
        <Typography variant="h6" gutterBottom>
          Add or update master key
        </Typography>
        <TextField
          label="Master key"
          variant="outlined"
          name="key"
          type="password"
          onChange={handleTextInputChange}
          fullWidth
        />
        <SubmitButton />
        {isMasterKey && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleDeleteMasterKey}
          >
            Delete master key
          </Button>
        )}
      </Stack>
    </form>
  );
};
