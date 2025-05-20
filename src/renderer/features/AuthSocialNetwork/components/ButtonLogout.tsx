import { memo } from "react";
import Button from "@mui/material/Button";
import { useControl } from "../hooks";
import type { TPropsButtonLogout } from "./types";

export const ButtonLogout = memo(({ text, ...other }: TPropsButtonLogout) => {
  const { handleLogout } = useControl();

  return (
    <Button fullWidth variant="outlined" onClick={handleLogout} {...other}>
      {text}
    </Button>
  );
});
