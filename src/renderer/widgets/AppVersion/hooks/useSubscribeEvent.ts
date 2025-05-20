import { useEffect, useState } from "react";
import type { THookSubscribeEvent } from "./types";

export const useSubscribeEvent = (): THookSubscribeEvent => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    window.electron.invoke.getVersion().then((value) => {
      setVersion((prevValue) => (prevValue === value ? prevValue : value));
    });
  }, []);

  return {
    version,
  };
};
