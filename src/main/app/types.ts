import type { TItem } from "../menu/types.js";

export type TDestroyProcess = {
  error?: any;
  message: string;
  title: string;
};

export type TMenuProvider = {
  getMenu: () => TItem[];
  buildMenu: (items?: TItem[]) => void;
};
