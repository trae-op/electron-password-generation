import { useEffect, useState } from "react";
import type { THookSubscribeEventTwoFactorQA } from "./types";
import isEqual from "lodash/isEqual";

export const useSubscribeEventTwoFactorQA =
  (): THookSubscribeEventTwoFactorQA => {
    const [base64, setBase64] = useState("");

    useEffect(() => {
      const unSub = window.electron.receive.subscribeWindowTwoFactorQA(
        (data) => {
          if (data.base64 !== undefined) {
            setBase64((prevPayload) => {
              if (isEqual(prevPayload, data.base64)) {
                return prevPayload;
              }
              return data.base64 || "";
            });
          }
        }
      );

      return unSub;
    }, []);

    return {
      base64,
    };
  };
