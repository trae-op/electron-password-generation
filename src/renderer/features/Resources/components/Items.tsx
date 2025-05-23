import { memo } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { useSubscribeEvent } from "../hooks";
import { useReceiveResources } from "../hooks/useReceiveResources";
import type { TPropsItems } from "./types";

export const Items = memo(({ renderEntity }: TPropsItems) => {
  useReceiveResources();
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
