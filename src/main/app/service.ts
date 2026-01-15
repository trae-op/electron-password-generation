import { app, BrowserWindow } from "electron";
import { Injectable } from "../@core/decorators/injectable.js";
import { TrayService } from "../tray/service.js";
import { getWindow } from "../@core/control-window/receive.js";
import { deleteFromElectronStorage } from "../$shared/store.js";
import { ipcWebContentsSend } from "../$shared/utils.js";
import { DataProvider } from "./data-provider.js";

@Injectable()
export class AppService {
  constructor(
    private trayService: TrayService,
    private dataProvider: DataProvider
  ) {}

  destroyTrayAndWindows(): void {
    this.trayService.destroyTray();
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

  showMenu(): void {
    const menu = this.dataProvider.getMenu();
    console.log(menu);
  }
}
