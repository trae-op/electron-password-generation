import { LoadingSpinner } from "@components/LoadingSpinner";
import { useControlContext } from "@ui-business/AuthSocialNetwork";

export const AuthLoadingSpinner = () => {
  const { isAuthenticated } = useControlContext();

  if (isAuthenticated === undefined) {
    return <LoadingSpinner />;
  }

  return null;
};
