import { ReactNode } from "react";

export type TPropsProvider = {
  children: ReactNode;
  isMasterKey?: boolean;
};

export type TPropsItem = Pick<TResource, "id" | "name" | "key"> & {
  handleCopy: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
  handleKey: () => void;
};
