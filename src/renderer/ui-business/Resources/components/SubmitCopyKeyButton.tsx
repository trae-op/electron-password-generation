import { memo } from "react";
import { useFormStatus } from "react-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useControlContext } from "../hooks/useControlContext";

export const SubmitButton = memo(({ ...other }: IconButtonProps) => {
  const { isDisabledActions } = useControlContext();
  const { pending } = useFormStatus();

  return (
    <IconButton
      disabled={pending || isDisabledActions}
      loading={pending}
      type="submit"
      {...other}
    >
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  );
});
