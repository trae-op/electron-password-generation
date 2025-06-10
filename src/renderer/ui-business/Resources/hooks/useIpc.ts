import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setItems } = useControlContextActions();

  useEffect(() => {
    window.electron.send.resources();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeResources(({ items }) => {
      setItems(items);
    });
  }, []);
};
