import { useContext } from "react";
import { Context, ContextUserPopover } from "../context";

export const useControlContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useControlContext must be used inside Provider");
  }
  return context;
};

export const useControlContextUserPopover = () => {
  const context = useContext(ContextUserPopover);

  if (!context) {
    throw new Error(
      "useControlContextUserPopover must be used inside Provider"
    );
  }
  return context;
};
