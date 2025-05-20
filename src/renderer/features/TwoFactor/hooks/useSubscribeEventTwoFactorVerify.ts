import { useEffect } from "react";
import { useControlContext } from "./useControlContext";

export const useSubscribeEventTwoFactorVerify = () => {
  const { setPending, setTwoFactorCode } = useControlContext();

  useEffect(() => {
    const unSub =
      window.electron.receive.subscribeWindowSendTwoFactorCodeVerify(() => {
        setPending(false);
        setTwoFactorCode("");
      });

    return unSub;
  }, []);
};
