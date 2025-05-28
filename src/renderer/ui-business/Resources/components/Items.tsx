import { memo } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { useControlContext } from "../hooks/useControlContext";
import { useIpc } from "../hooks/useIpc";
import { Item } from "./Item";

export const Items = memo(() => {
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

  return list.map((item) => {
    const handleUpdate = () => {
      window.electron.send.windowOpenUpdateResource({
        id: item.id + "",
      });
    };

    const handleCopy = () => {
      console.log(item.id);
    };

    const handleDelete = () => {
      window.electron.send.windowOpenDeleteResource({
        id: item.id + "",
      });
    };

    return (
      <Item
        key={item.id + ""}
        id={item.id}
        name={item.name}
        handleCopy={handleCopy}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    );
  });
});
