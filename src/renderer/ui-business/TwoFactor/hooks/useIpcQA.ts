import { useEffect } from "react";
import isEqual from "lodash/isEqual";
import { useControlContextActions } from "./useControlContext";

export const useIpcQA = () => {
  const { setBase64 } = useControlContextActions();

  useEffect(() => {
    const unSub = window.electron.receive.subscribeWindowTwoFactorQA((data) => {
      if (data.base64 !== undefined) {
        setBase64((prevPayload) => {
          if (isEqual(prevPayload, data.base64)) {
            return prevPayload;
          }
          return data.base64 || "";
        });
      }
    });

    return unSub;
  }, []);
};
