import Typography from "@mui/material/Typography";
import { useInvoke } from "../hooks";
import { memo } from "react";
import type { TPropsContainer } from "./types";

export const Container = memo(({ ...other }: TPropsContainer) => {
  const { version } = useInvoke();

  if (version === "") {
    return null;
  }

  return (
    <Typography variant="h5" component="div" {...other}>
      v{version}
    </Typography>
  );
});
