import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useControl } from "../hooks/useControl";
import Typography from "@mui/material/Typography";

export const Confirm = () => {
  const { handleCancel, handleDelete } = useControl();

  return (
    <Stack direction="column" spacing={2}>
      <Typography
        sx={{
          textAlign: "center",
        }}
        gutterBottom
        variant="h5"
      >
        Are you sure?
      </Typography>
      <Stack
        sx={{
          width: "100%",
        }}
        direction="row"
        spacing={2}
      >
        <Button fullWidth variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button fullWidth variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};
