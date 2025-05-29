import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setResult, setName } = useControlContextActions();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getResource({
      id: id || "",
    });
  }, [id]);

  useEffect(() => {
    window.electron.receive.subscribeGetResource(({ item }) => {
      setResult(item);
      if (item?.name) {
        setName(item.name);
      }
    });
  }, []);
};
