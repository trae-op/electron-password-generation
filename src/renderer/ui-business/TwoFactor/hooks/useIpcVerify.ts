import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpcVerify = () => {
  const { setPending, setTwoFactorCode } = useControlContextActions();

  useEffect(() => {
    const unSub =
      window.electron.receive.subscribeWindowSendTwoFactorCodeVerify(() => {
        setPending(false);
        setTwoFactorCode("");
      });

    return unSub;
  }, []);
};
