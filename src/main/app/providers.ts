import type { TItem } from "../menu/types.js";

export abstract class MenuProvider {
  abstract getMenu(): TItem[];
  abstract buildMenu(items?: TItem[]): void;
}
