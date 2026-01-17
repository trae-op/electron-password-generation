import {
  IpcHandler,
  type TIpcHandlerInterface,
  type TParamOnInit,
} from "@traeop/electron-modular";

@IpcHandler()
export class AppPreloadIpc implements TIpcHandlerInterface {
  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["preloadApp"]>) {
    const mainWindow = getWindow("window:preload-app");
    mainWindow.create();
  }
}
