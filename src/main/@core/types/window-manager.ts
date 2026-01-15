import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  type Event,
  type WebContentsWillRedirectEventParams,
} from "electron";
import type { TParamsCreateWindow } from "../control-window/types.js";

export type WindowManagerOptions = TParamsCreateWindow & {
  options: BrowserWindowConstructorOptions;
};

type TWindowEventHandler = (...args: any[]) => void;

export type TWindowManager = {
  onDidFinishLoad?: (window: BrowserWindow) => void;
  onWebContentsDidFinishLoad?: (window: BrowserWindow) => void;
  onShow?: (window: BrowserWindow) => void;
  onHide?: (window: BrowserWindow) => void;
  onClose?: (event: Event, window: BrowserWindow) => void;
  onWillRedirect?: (
    event: Event<WebContentsWillRedirectEventParams>,
    url: string
  ) => void;
  onWebContentsWillRedirect?: (
    event: Event<WebContentsWillRedirectEventParams>,
    url: string,
    window: BrowserWindow
  ) => void;
};

export type TWindowManagerWithHandlers = TWindowManager & {
  [key: `on${string}`]: TWindowEventHandler | undefined;
};
