import { useEffect } from "react";
import { useControlContext } from "./useControlContext";

export const useSubscribeEventUser = () => {
  const { setUser } = useControlContext();

  useEffect(() => {
    const unSub = window.electron.receive.subscribeCheckUser(({ user }) => {
      setUser(user);
    });

    return unSub;
  }, []);
};
