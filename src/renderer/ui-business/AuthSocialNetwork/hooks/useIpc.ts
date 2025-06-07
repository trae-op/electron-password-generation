import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setAuthenticated } = useControlContextActions();

  useEffect(() => {
    window.electron.receive.subscribeWindowAuthSocialNetwork(
      ({ isAuthenticated }) => {
        setAuthenticated(isAuthenticated);
      }
    );
  }, []);
};
