import { useEffect } from "react";
import isEqual from "lodash/isEqual";
import { useControlContext } from "./useControlContext";

export const useIpcQA = () => {
  const { setBase64 } = useControlContext();

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
