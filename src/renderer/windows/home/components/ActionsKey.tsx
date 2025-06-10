import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import HttpsIcon from "@mui/icons-material/Https";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import { useControlContext as useControlContextSync } from "@ui-business/Sync";
import { TPropsHomeChildren } from "./types";

const ActionsKey = memo(({ isMasterKey }: TPropsHomeChildren) => {
  const { isAuthenticated } = useControlContextSync();
  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  if (!isMasterKey) {
    return (
      <IconButton size="small" disabled={!isAuthenticated} onClick={handleKey}>
        <HttpsIcon fontSize="medium" />
      </IconButton>
    );
  }

  return (
    <IconButton size="small" disabled={!isAuthenticated} onClick={handleKey}>
      <NoEncryptionGmailerrorredIcon fontSize="medium" />
    </IconButton>
  );
});

export default ActionsKey;
