import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useControlContext } from "./useControlContext";

export const useIpc = () => {
  const { setResult, setName } = useControlContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getResource({
      id: id || "",
    });
  }, [id]);

  useEffect(() => {
    window.electron.receive.subscribeGetResource(({ item }) => {
      console.log("item", item);
      setResult(item);
      if (item?.name) {
        setName(item.name);
      }
    });
  }, []);
};
