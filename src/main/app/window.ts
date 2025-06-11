import { app, BrowserWindow, Event } from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { MenuService } from "../menu/service.js";
import { getElectronStorage } from "../$shared/store.js";
import { SetFeedUrlService } from "../updater/services/windows/set-feed-url.js";
import { CheckForUpdatesService } from "../updater/services/check-for-updates.js";
import { AuthService } from "../auth/service.js";
import { ControlUpdateWindowsPlatformService } from "../updater/services/windows/control-update.js";
import { TrayService } from "../tray/service.js";
import { destroyWindows } from "../@core/control-window/destroy.js";
import { ipcWebContentsSend, isDev } from "../$shared/utils.js";
import { menu } from "../config.js";

@WindowManager<TWindows["main"]>({
  hash: "window:main",
  isCache: true,
  options: {
    resizable: isDev(),
    show: false,
    width: 320,
    height: 500,
  },
})
export class AppWindow implements TWindowManager {
  private isWillClose = false;

  constructor(
    private menuService: MenuService,
    private trayService: TrayService,
    private authService: AuthService,
    private setFeedUrlService: SetFeedUrlService,
    private checkForUpdatesService: CheckForUpdatesService,
    private controlUpdateWindowsPlatformService: ControlUpdateWindowsPlatformService
  ) {
    this.setFeedUrlService.setFeedURL();
    this.controlUpdateWindowsPlatformService.controlUpdate();

    app.on("before-quit", () => {
      this.isWillClose = true;

      this.trayService.destroyTray();
      destroyWindows();
    });
  }

  onDidFinishLoad(window: BrowserWindow): void {
    this.buildMenu(window);
    this.buildTray(window);
    this.checkAuthenticated(window);
    this.authService.setCheckAccessInterval(window);

    const userId = getElectronStorage("userId");
    const authToken = getElectronStorage("authToken");

    if (userId && authToken) {
      this.checkForUpdatesService.checkForUpdates();
    }
  }

  private async checkAuthenticated(window: BrowserWindow) {
    const result = await this.authService.checkAuthenticated(window);
    ipcWebContentsSend("authSocialNetwork", window.webContents, {
      isAuthenticated:
        result !== undefined && result.isAuthenticated !== undefined,
    });
  }

  private buildTray(window: BrowserWindow): void {
    this.trayService.buildTray(
      this.trayService.trayMenu.map((item) => {
        if (item.name === "show") {
          item.click = () => {
            window.show();
            if (app.dock) {
              app.dock.show();
            }
          };
        }

        if (item.name === "quit") {
          item.click = () => app.quit();
        }

        return item;
      })
    );
  }

  private buildMenu(window: BrowserWindow): void {
    this.menuService.buildMenu(
      this.menuService.menu.map((item) => {
        if (item.name === "app") {
          item.submenu = [
            {
              label: menu.labels.devTools,
              click: () => window.webContents.openDevTools(),
            },
            {
              label: menu.labels.quit,
              click: () => app.quit(),
            },
          ];
        }

        if (item.name === "edit") {
          item.submenu = [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
          ];
        }

        return item;
      })
    );
  }

  onShow(): void {
    this.isWillClose = false;
  }

  onClose(event: Event, window: BrowserWindow): void {
    if (this.isWillClose) {
      return;
    }

    event.preventDefault();
    window.hide();
    if (app.dock) {
      app.dock.hide();
    }
  }
}
