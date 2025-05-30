import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setMasterKey } = useControlContextActions();

  useEffect(() => {
    window.electron.receive.subscribeMasterKey(({ isMasterKey }) => {
      setMasterKey(isMasterKey);
    });
  }, []);

  useEffect(() => {
    window.electron.send.checkMasterKey();
  }, []);
};
