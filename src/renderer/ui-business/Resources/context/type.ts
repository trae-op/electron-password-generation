import { Dispatch, SetStateAction } from "react";

export type TContext = {
  list: TResource[] | undefined;
  isMasterKey?: boolean;
  copyKeyResourceId?: string;
  isDisabledActions: boolean;
};

export type TContextActions = {
  setItems: (items: TResource[]) => void;
  setCopyKeyResourceId: Dispatch<SetStateAction<string | undefined>>;
};
