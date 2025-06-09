import { useContext } from "react";
import { Context, ContextActions, ContextComponents } from "../context";

export const useControlContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useControlContext must be used inside Provider");
  }
  return context;
};

export const useControlContextActions = () => {
  const context = useContext(ContextActions);

  if (!context) {
    throw new Error("useControlContextActions must be used inside Provider");
  }
  return context;
};

export const useControlContextComponents = () => {
  const context = useContext(ContextComponents);

  if (!context) {
    throw new Error("ContextComponents must be used inside Provider");
  }
  return context;
};
