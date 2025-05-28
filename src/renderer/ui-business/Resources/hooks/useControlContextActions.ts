import { useContext } from "react";
import { ContextActions } from "../context";

export const useControlContextActions = () => {
  const context = useContext(ContextActions);

  if (!context) {
    throw new Error("useControlContextActions must be used inside Provider");
  }
  return context;
};
