import { useEffect } from "react";
import { useControlContext } from "./useControlContext";

export const useSubscribeEvent = () => {
  const { setAuthenticated } = useControlContext();

  useEffect(() => {
    window.electron.receive.subscribeWindowAuthSocialNetwork(
      ({ isAuthenticated }) => {
        setAuthenticated(isAuthenticated);
      }
    );
  }, []);
};
