import { Dispatch, SetStateAction } from "react";

export type TContext = {
  isMasterKey: boolean;
  key: string;
};

export type TContextActions = {
  setMasterKey: Dispatch<SetStateAction<boolean>>;
  setKey: Dispatch<SetStateAction<string>>;
};
