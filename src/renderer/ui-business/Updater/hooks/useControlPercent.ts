import { useMemo } from "react";
import type { THookControlPercent } from "./types";
import { useControlContext } from "./useControlContext";

export const useControlPercent = (): THookControlPercent => {
  const { downloadedPercent } = useControlContext();
  const percent = useMemo(
    () =>
      downloadedPercent === undefined
        ? undefined
        : Math.round(Number(downloadedPercent)),
    [downloadedPercent]
  );

  return {
    percent,
  };
};
