import { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import type { THookSubscribeEvent } from "./types";

export const useSubscribeEvent = (): THookSubscribeEvent => {
  const [list, setList] = useState<TResource[] | undefined>(undefined);

  useEffect(() => {
    window.electron.receive.subscribeResources(({ items }) => {
      setList((prevItems) => (isEqual(prevItems, items) ? prevItems : items));
    });
  }, []);

  return {
    list,
  };
};
