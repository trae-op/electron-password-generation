import { Dispatch, ReactElement, SetStateAction } from "react";

export type TContext = {
  result: TResource | undefined;
  name: string;
};

export type TContextActions = {
  setName: Dispatch<SetStateAction<string>>;
  setResult: Dispatch<SetStateAction<TResource | undefined>>;
};

export type TContextComponents = {
  renderGenerateCharacters: ReactElement;
};
