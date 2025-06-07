import { app, BrowserWindow, Event } from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { MenuService } from "../menu/service.js";
import { getElectronStorage } from "../$shared/store.js";
import { SetFeedUrlService } from "../updater/services/windows/set-feed-url.js";
import { CheckForUpdatesService } from "../updater/services/check-for-updates.js";
import { AuthService } from "../auth/service.js";
import { AppService } from "./service.js";
import { ControlUpdateWindowsPlatformService } from "../updater/services/windows/control-update.js";
import { TrayService } from "../tray/service.js";
import { destroyWindows } from "../@core/control-window/destroy.js";
import { ipcWebContentsSend } from "../$shared/utils.js";
import { menu, restApi } from "../config.js";

@WindowManager<TWindows["main"]>({
  hash: "window:main",
  isCache: true,
  options: {
    resizable: false,
    show: false,
    width: 600,
    height: 600,
  },
})
export class AppWindow implements TWindowManager {
  private isWillClose = false;

  constructor(
    private menuService: MenuService,
    private trayService: TrayService,
    private authService: AuthService,
    private appService: AppService,
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
    console.log("onDidFinishLoad");
    this.buildMenu(window);
    this.buildTray(window);
    this.checkAccess(window);
    this.setCheckAccessInterval(window);

    const userId = getElectronStorage("userId");
    const authToken = getElectronStorage("authToken");

    if (userId && authToken) {
      this.checkForUpdatesService.checkForUpdates();
    }
  }

  private cacheAccess(): { ok: boolean } | undefined {
    let access: { ok: boolean } | undefined = undefined;
    const cacheResponse = getElectronStorage("response");

    if (cacheResponse !== undefined) {
      access =
        cacheResponse[
          `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.access}`
        ];
    }

    if (access !== undefined) {
      return access;
    }

    return undefined;
  }

  private setCheckAccessInterval(window: BrowserWindow) {
    const interval = setInterval(async () => {
      const cacheAccess = this.cacheAccess();
      try {
        if (cacheAccess !== undefined) {
          ipcWebContentsSend("sync", window.webContents, {
            isAuthenticated: cacheAccess.ok,
          });
        }

        ipcWebContentsSend("sync", window.webContents, {
          isAuthenticated: false,
        });

        const response = await this.authService.access();

        if (response !== undefined) {
          ipcWebContentsSend("sync", window.webContents, {
            isAuthenticated: response.ok,
          });
        }
      } catch (error) {
        ipcWebContentsSend("sync", window.webContents, {
          isAuthenticated: true,
        });
        this.appService.logout(window);
      }

      const authToken = getElectronStorage("authToken");
      if (authToken === undefined) {
        clearInterval(interval);
      }
    }, 10000);
  }

  private async checkAccess(window: BrowserWindow) {
    // const userId = getElectronStorage("userId");
    // const twoFactorSecret = getElectronStorage("twoFactorSecret");
    const cacheAccess = this.cacheAccess();
    if (cacheAccess !== undefined) {
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: cacheAccess.ok,
      });
    }

    const response = await this.authService.access();

    if (response !== undefined) {
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: response.ok,
      });
      ipcWebContentsSend("authSocialNetwork", window.webContents, {
        isAuthenticated: response.ok,
      });
    } else {
      this.appService.logout(window);
    }

    // if (this.isCacheAuthenticated(userId)) {
    //   ipcWebContentsSend("authSocialNetwork", window.webContents, {
    //     isAuthenticated: this.isCacheAuthenticated(userId),
    //   });
    // } else {
    //   this.appService.logout(window);
    // }
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
