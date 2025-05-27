import { useEffect } from "react";
import { useControlContext } from "./useControlContext";

export const useIpc = () => {
  const { setAuthenticated } = useControlContext();

  useEffect(() => {
    window.electron.receive.subscribeWindowAuthSocialNetwork(
      ({ isAuthenticated }) => {
        setAuthenticated(isAuthenticated);
      }
    );
  }, []);
};
