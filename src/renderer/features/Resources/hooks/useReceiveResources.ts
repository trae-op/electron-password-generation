import { useEffect } from "react";

export const useReceiveResources = () => {
  useEffect(() => {
    window.electron.send.resources();
  }, []);
};
