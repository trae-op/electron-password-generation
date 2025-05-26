import { ChangeEvent, useActionState, memo } from "react";
import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useReceiveResource } from "../hooks/useReceiveResource";
import { useSubscribeEvent } from "../hooks/useSubscribeEvent";
import type { TPropsForm } from "./types";

const SubmitButton = memo(() => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      loading={pending}
      sx={{ mt: 3, position: "relative" }}
      disabled={pending}
    >
      {pending ? "Sending..." : "Apply"}
    </Button>
  );
});

async function submitFormAction(
  _: undefined,
  formData: FormData
): Promise<undefined> {
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
}

export const Form = memo(({ renderGenerateCharacters }: TPropsForm) => {
  useReceiveResource();
  const { result, name, setName } = useSubscribeEvent();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  if (result === undefined) {
    return (
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          backgroundColor: "rgba(24, 24, 24)",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={70} />
      </Stack>
    );
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

        {renderGenerateCharacters}

        <SubmitButton />
      </Stack>
    </Box>
  );
});
