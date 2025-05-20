import { memo } from "react";
import { useControlContext } from "../hooks";
import Button from "@mui/material/Button";
import { useUpdateDownloaded } from "../hooks";
import { type TPropsButtonDownloaded } from "./types";

export const ButtonDownloaded = memo(
  ({ text, ...other }: TPropsButtonDownloaded) => {
    const { status, version } = useControlContext();
    const { handleUpdate } = useUpdateDownloaded();

    if (status !== "update-downloaded" && version === undefined) {
      return null;
    }

    return (
      <Button variant="outlined" onClick={handleUpdate} {...other}>
        {text} {version}
      </Button>
    );
  }
);
