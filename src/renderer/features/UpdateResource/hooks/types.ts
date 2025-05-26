import { Dispatch, SetStateAction } from "react";

export type THookSubscribeEvent = {
  result: TResource | undefined;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};
export type THookControl = {};
