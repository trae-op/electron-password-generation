import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import HttpsIcon from "@mui/icons-material/Https";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import { TPropsHomeChildren } from "./types";

const ActionsKey = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  if (!isMasterKey) {
    return (
      <IconButton
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
        }}
        onClick={handleKey}
      >
        <HttpsIcon fontSize="large" />
      </IconButton>
    );
  }

  return (
    <IconButton
      sx={{
        position: "fixed",
        bottom: 10,
        right: 70,
      }}
      onClick={handleKey}
    >
      <NoEncryptionGmailerrorredIcon fontSize="large" />
    </IconButton>
  );
});

export default ActionsKey;
