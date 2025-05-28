import { ReactNode } from "react";

export type TPropsProvider = {
  children: ReactNode;
};

export type TPropsItem = Pick<TResource, "id" | "name" | "key"> & {
  handleCopy: () => void;
  handleUpdate: () => void;
};
