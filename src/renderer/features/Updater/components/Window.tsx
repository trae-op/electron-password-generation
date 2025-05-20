import Stack from "@mui/material/Stack";
import { Circular } from "./CircularProgress";
import { ButtonDownloaded } from "./ButtonDownloaded";
import { useUpdate } from "../hooks";
import { Context } from "../context";
import { Message } from "./Message";

export const Window = () => {
  const value = useUpdate();

  return (
    <Context.Provider value={value}>
      <Stack spacing={2} alignItems="center">
        <Message />
        <Circular />
        <ButtonDownloaded text="Update downloaded" />
      </Stack>
    </Context.Provider>
  );
};
