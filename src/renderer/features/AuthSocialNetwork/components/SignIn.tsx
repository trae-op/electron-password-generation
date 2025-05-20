import Stack from "@mui/material/Stack";
import { ButtonProvider } from "./ButtonProvider";

export const SignIn = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <ButtonProvider data-provider="google" text="Enter by Google" />
      <ButtonProvider data-provider="facebook" text="Enter by Facebook" />
    </Stack>
  );
};
