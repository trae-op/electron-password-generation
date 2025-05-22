import { memo } from "react";
import { useSubscribeEvent } from "../hooks";
import type { TPropsItems } from "./types";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export const Items = memo(({ renderEntity }: TPropsItems) => {
  const { list } = useSubscribeEvent();

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
