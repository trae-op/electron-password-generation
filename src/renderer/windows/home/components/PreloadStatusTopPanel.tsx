import CircularProgress from "@mui/material/CircularProgress";
import { useControlContext, useIpc } from "@ui-business/Sync";

export const PreloadStatusTopPanel = () => {
  useIpc();
  const { isAuthenticated, isResources, isUser } = useControlContext();

  if (isResources && isUser && isAuthenticated) {
    return null;
  }

  return <CircularProgress size={20} />;
};
