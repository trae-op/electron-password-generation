import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setAuthenticated, setStatusAuthenticated } =
    useControlContextActions();

  useEffect(() => {
    window.electron.receive.subscribeWindowAuthSocialNetwork(
      ({ isAuthenticated }) => {
        setAuthenticated(isAuthenticated);
      }
    );
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeWindowStatusAuthSocialNetwork(
      ({ isAuthenticated }) => {
        setStatusAuthenticated(isAuthenticated);
      }
    );
  }, []);
};
