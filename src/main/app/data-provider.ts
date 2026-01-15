import type { TItem } from "../menu/types.js";

export abstract class DataProvider {
  abstract getMenu(): TItem[];
}
