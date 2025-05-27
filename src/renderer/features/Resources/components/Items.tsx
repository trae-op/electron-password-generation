import { memo } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { useControlContext } from "../hooks/useControlContext";
import { useIpc } from "../hooks/useIpc";
import type { TPropsItems } from "./types";

export const Items = memo(({ renderEntity }: TPropsItems) => {
  useIpc();
  const { list } = useControlContext();

  if (list === undefined) {
    return (
      <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }} useFlexGap>
        <Skeleton variant="rounded" width={170} height={100} />
        <Skeleton variant="rounded" width={170} height={100} />
        <Skeleton variant="rounded" width={170} height={100} />
        <Skeleton variant="rounded" width={170} height={100} />
      </Stack>
    );
  }

  return list.map((item) => renderEntity(item));
});
