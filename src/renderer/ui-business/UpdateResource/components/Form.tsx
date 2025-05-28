import { useActionState, memo } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useIpc } from "../hooks/useIpc";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { SubmitButton } from "./SubmitButton";
import type { TPropsForm } from "./types";
import { useControl } from "../hooks/useControl";
import { useControlContext } from "../hooks/useControlContext";

export const Form = memo(({ renderGenerateCharacters }: TPropsForm) => {
  useIpc();
  const { result, openCreateNewPassword, name } = useControlContext();
  const { handleTextInputChange, handleCheckedChange, submitFormAction } =
    useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  if (result === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        width: "100%",
      }}
      component="form"
      action={formAction}
      noValidate
      autoComplete="off"
    >
      <Stack direction="column" spacing={1}>
        <TextField
          label="Resource name"
          variant="outlined"
          name="name"
          value={name}
          onChange={handleTextInputChange}
          fullWidth
        />

        <FormControlLabel
          control={<Checkbox onChange={handleCheckedChange} />}
          label="Create a new password"
          name="new-password"
        />

        {openCreateNewPassword && renderGenerateCharacters}

        <SubmitButton />
      </Stack>
    </Box>
  );
});
