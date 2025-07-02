import { ReactElement } from "react";

export type TContext = {
  name: string;
};

export type TContextActions = {
  setName: React.Dispatch<React.SetStateAction<string>>;
};

export type TContextComponents = {
  renderGenerateCharacters: ReactElement;
};
