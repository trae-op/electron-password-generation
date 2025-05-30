import { memo } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useControlContext } from "../hooks/useControlContext";
import { useIpc } from "../hooks/useIpc";
import { Item } from "./Item";

const countResources = localStorage.getItem("count-of-resources");

export const Items = memo(() => {
  useIpc();
  const { list } = useControlContext();

  if (list === undefined) {
    return (
      <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }} useFlexGap>
        {countResources !== null && Number(countResources) ? (
          Array.from({ length: Number(countResources) }, (_, i) => i).map(
            () => <Skeleton variant="rounded" width={170} height={110} />
          )
        ) : (
          <CircularProgress size={70} />
        )}
      </Stack>
    );
  }

  if (list !== undefined && list.length === 0) {
    return (
      <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }} useFlexGap>
        <Typography gutterBottom variant="h5">
          Empty
        </Typography>
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

    const handleKey = () => {
      window.electron.send.windowMasterKey();
    };

    return (
      <Item
        key={item.id + ""}
        id={item.id}
        name={item.name}
        handleKey={handleKey}
        handleCopy={handleCopy}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    );
  });
});
