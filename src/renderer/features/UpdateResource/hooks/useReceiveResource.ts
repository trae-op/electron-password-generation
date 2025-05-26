import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useReceiveResource = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getResource({
      id: id || "",
    });
  }, [id]);
};
