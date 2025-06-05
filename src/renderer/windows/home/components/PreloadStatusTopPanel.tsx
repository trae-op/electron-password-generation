import { useControlContext as useControlContextAuthSocialNetwork } from "@ui-business/AuthSocialNetwork";
import CircularProgress from "@mui/material/CircularProgress";

export const PreloadStatusTopPanel = () => {
  const { isStatusAuthenticated } = useControlContextAuthSocialNetwork();

  if (isStatusAuthenticated) {
    return null;
  }

  return <CircularProgress size={20} />;
};
