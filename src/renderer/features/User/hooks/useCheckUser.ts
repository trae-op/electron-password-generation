import { useEffect } from "react";

export const useCheckUser = () => {
  useEffect(() => {
    window.electron.send.checkUser();
  }, []);
};
