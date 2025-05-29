import { useState, useMemo, useCallback } from "react";
import type {
  THookControlTwoFactorVerify,
  TChangeEvent,
  TFormEvent,
} from "./types";
import { isValidTwoFactor } from "@utils/regexes";
import {
  useControlContext,
  useControlContextActions,
} from "./useControlContext";

export const useControlTwoFactorVerify = (): THookControlTwoFactorVerify => {
  const { setTwoFactorCode, setPending } = useControlContextActions();
  const { twoFactorCode } = useControlContext();
  const [isFocus, setFocus] = useState(false);

  const handleChange = useCallback((event: TChangeEvent) => {
    setTwoFactorCode(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event: TFormEvent) => {
      event.preventDefault();
      setPending(true);
      window.electron.send.sendTwoFactorCodeVerify({ twoFactorCode });
    },
    [twoFactorCode]
  );

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const isValid = useMemo(
    () => isValidTwoFactor(twoFactorCode),
    [twoFactorCode]
  );
  const isInvalid = useMemo(() => isFocus && !isValid, [isFocus, isValid]);

  const value = useMemo(
    () => ({
      handleChange,
      handleSubmit,
      twoFactorCode,
      handleFocus,
      isInvalid,
      isValid,
    }),
    [handleChange, handleSubmit, twoFactorCode, handleFocus, isInvalid, isValid]
  );

  return value;
};
