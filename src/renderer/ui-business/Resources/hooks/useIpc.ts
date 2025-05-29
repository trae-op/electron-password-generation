import { useEffect } from "react";
import { useControlContextActions } from "./useControlContextActions";

export const useIpc = () => {
  const { setItems } = useControlContextActions();

  useEffect(() => {
    window.electron.send.resources();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeResources(({ items }) => {
      setItems(items);
      localStorage.setItem("count-of-resources", items.length + "");
    });
  }, []);
};
