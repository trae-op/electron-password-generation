import { useEffect } from "react";

export const useSubscribeEvent = () => {
  useEffect(() => {
    window.electron.receive.subscribeResource(({ item }) => {
      console.log("Resource updated", item);
    });
  }, []);
};
