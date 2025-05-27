import { useEffect } from "react";
import isEqual from "lodash/isEqual";
import { useControlContext } from "./useControlContext";

export const useIpc = () => {
  const { setList } = useControlContext();

  useEffect(() => {
    window.electron.send.resources();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeResources(({ items }) => {
      setList((prevItems) => (isEqual(prevItems, items) ? prevItems : items));
    });
  }, []);
};
