import { app } from "electron";
import { Injectable } from "../@core/decorators/injectable.js";
import { getWindow } from "../@core/control-window/receive.js";
import { Inject } from "../@core/decorators/inject.js";
import { TRAY_PROVIDER } from "./tokens.js";
import type { TTrayProvider } from "./types.js";

@Injectable()
export class AppService {
  constructor(@Inject(TRAY_PROVIDER) private trayProvider: TTrayProvider) {}

  destroyTrayAndWindows(): void {
    this.trayProvider.destroyTray();
    const preloadAppWindow =
      getWindow<TWindows["preloadApp"]>("window:preload-app");

    if (preloadAppWindow !== undefined) {
      preloadAppWindow.destroy();
    }
  }

  dockHide() {
    if (app.dock) {
      app.dock.hide();
    }
  }
}
