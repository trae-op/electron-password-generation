import { useFormStatus } from "react-dom";
import Button from "@mui/material/Button";

export const SubmitButton = () => {
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
};
