import { ReactNode, type ReactElement } from "react";

export type TPropsItems = {
  renderEntity: (data: TResource) => ReactElement;
};

export type TPropsProvider = {
  children: ReactNode;
};
