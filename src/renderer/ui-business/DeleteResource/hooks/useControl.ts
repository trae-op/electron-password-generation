import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { id } = useParams<{ id: string }>();

  const handleDelete = useCallback(() => {
    window.electron.send.deleteResource({
      id: id + "",
    });
  }, [id]);

  const handleCancel = useCallback(() => {
    window.electron.send.cancelDeleteResource();
  }, []);

  return {
    handleDelete,
    handleCancel,
  };
};
