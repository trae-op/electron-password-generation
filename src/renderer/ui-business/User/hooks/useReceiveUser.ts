import { useEffect } from "react";

export const useReceiveUser = () => {
  useEffect(() => {
    window.electron.send.checkUser();
  }, []);
};
