import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setUser, setAuthenticated, setResources } =
    useControlContextActions();

  useEffect(() => {
    const unSub = window.electron.receive.subscribeSync(
      ({ isAuthenticated, isResources, isUser }) => {
        setAuthenticated(isAuthenticated);
        setUser((prevValue) => {
          if (prevValue === undefined) {
            return isUser;
          }

          if (prevValue !== undefined && isUser === undefined) {
            return prevValue;
          }

          if (isUser !== undefined && prevValue !== undefined) {
            return isUser;
          }
        });
        setResources((prevValue) => {
          if (prevValue === undefined) {
            return isResources;
          }

          if (prevValue !== undefined && isResources === undefined) {
            return prevValue;
          }

          if (isResources !== undefined && prevValue !== undefined) {
            return isResources;
          }
        });
      }
    );

    return unSub;
  }, []);
};
