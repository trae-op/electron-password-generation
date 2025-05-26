import { Dispatch, SetStateAction } from "react";

export type TContext = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};
