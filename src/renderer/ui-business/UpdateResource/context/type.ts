import { Dispatch, SetStateAction } from "react";

export type TContext = {
  result: TResource | undefined;
  name: string;
  openCreateNewPassword: boolean;
};

export type TContextActions = {
  setName: Dispatch<SetStateAction<string>>;
  setResult: Dispatch<SetStateAction<TResource | undefined>>;
  setOpenCreateNewPassword: Dispatch<SetStateAction<boolean>>;
};
