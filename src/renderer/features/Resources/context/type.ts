import { Dispatch, SetStateAction } from "react";

export type TContext = {
  list: TResource[] | undefined;
  setList: Dispatch<SetStateAction<TResource[] | undefined>>;
};
