import { useEffect, useState } from "react";
import type { THookSubscribeEvent } from "./types";

export const useSubscribeEvent = (): THookSubscribeEvent => {
  const [result, setResult] = useState<TResource>();
  const [name, setName] = useState("");

  useEffect(() => {
    window.electron.receive.subscribeGetResource(({ item }) => {
      setResult(item);
      if (item?.name) {
        setName(item.name);
      }
    });
  }, []);

  return {
    result,
    setName,
    name,
  };
};
