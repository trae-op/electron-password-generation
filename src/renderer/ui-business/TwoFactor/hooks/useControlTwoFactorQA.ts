import { useCallback } from "react";
import type { THookControlTwoFactorQA } from "./types";

export const useControlTwoFactorQA = (): THookControlTwoFactorQA => {
  const handleNextStep = useCallback(async () => {
    window.electron.send.windowTwoFactorVerify();
  }, []);

  return {
    handleNextStep,
  };
};
