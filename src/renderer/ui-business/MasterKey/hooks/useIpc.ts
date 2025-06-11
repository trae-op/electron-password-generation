import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setMasterKey } = useControlContextActions();

  useEffect(() => {
    window.electron.send.checkMasterKey();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeMasterKey(({ isMasterKey }) => {
      setMasterKey(isMasterKey);
    });
  }, []);
};
