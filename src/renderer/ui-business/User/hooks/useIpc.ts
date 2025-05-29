import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setUser } = useControlContextActions();

  useEffect(() => {
    const unSub = window.electron.receive.subscribeCheckUser(({ user }) => {
      setUser(user);
    });

    return unSub;
  }, []);

  useEffect(() => {
    window.electron.send.checkUser();
  }, []);
};
