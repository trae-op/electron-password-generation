import { IpcHandler } from "@traeop/electron-modular";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "@traeop/electron-modular";

@IpcHandler()
export class AppPreloadIpc implements TIpcHandlerInterface {
  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["preloadApp"]>) {
    const mainWindow = getWindow("window:preload-app");
    mainWindow.create();
  }
}
