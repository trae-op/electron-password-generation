import { BrowserWindow, type BrowserWindowConstructorOptions } from "electron";

export type TParamsCreateWindow<N = string> = {
  name?: N;
  isCache?: boolean;
  options?: BrowserWindowConstructorOptions;
  loadURL?: string;
};

export type TCache = {
  [key in string]: BrowserWindow;
};
