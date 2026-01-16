import { app, BrowserWindow, Event } from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { Inject } from "../@core/decorators/inject.js";
import { getElectronStorage } from "../$shared/store.js";
import { SetFeedUrlService } from "../updater/services/windows/set-feed-url.js";
import { CheckForUpdatesService } from "../updater/services/check-for-updates.js";
import { AuthService } from "../auth/service.js";
import { ControlUpdateWindowsPlatformService } from "../updater/services/windows/control-update.js";
import { destroyWindows } from "../@core/control-window/destroy.js";
import { ipcMainOn, ipcWebContentsSend, isDev } from "../$shared/utils.js";
import { menu } from "../config.js";
import type { TWindowManager } from "../types.js";
import { MENU_PROVIDER, TRAY_PROVIDER } from "./tokens.js";
import type { TMenuProvider, TTrayProvider } from "./types.js";

@WindowManager<TWindows["main"]>({
  hash: "window:main",
  isCache: true,
  options: {
    resizable: isDev(),
    show: false,
    width: 350,
    height: 500,
  },
})
export class AppWindow implements TWindowManager {
  private isWillClose = false;

  constructor(
    @Inject(MENU_PROVIDER) private readonly menuProvider: TMenuProvider,
    @Inject(TRAY_PROVIDER) private readonly trayProvider: TTrayProvider,
    private authService: AuthService,
    private setFeedUrlService: SetFeedUrlService,
    private checkForUpdatesService: CheckForUpdatesService,
    private controlUpdateWindowsPlatformService: ControlUpdateWindowsPlatformService
  ) {
    this.setFeedUrlService.setFeedURL();
    this.controlUpdateWindowsPlatformService.controlUpdate();

    app.on("before-quit", () => {
      this.isWillClose = true;

      this.trayProvider.destroyTray();
      destroyWindows();
    });
  }

  onWebContentsDidFinishLoad(window: BrowserWindow): void {
    this.buildMenu(window);
    this.buildTray(window);
    this.checkAuthenticated(window);
    this.ipcCheckSync(window);
    this.authService.setCheckAccessInterval(window);

    const userId = getElectronStorage("userId");
    const authToken = getElectronStorage("authToken");

    if (userId && authToken) {
      this.checkForUpdatesService.checkForUpdates();
    }
  }

  private ipcCheckSync(window: BrowserWindow): void {
    ipcMainOn("sync", (event) => {
      const result = this.authService.checkAuthenticated(window);

      event.reply("sync", {
        isAuthenticated: result !== undefined && result.isAuthenticated,
      });
    });
  }

  private async checkAuthenticated(window: BrowserWindow) {
    const result = this.authService.checkAuthenticated(window);
    ipcWebContentsSend("authSocialNetwork", window.webContents, {
      isAuthenticated:
        result !== undefined && result.isAuthenticated !== undefined,
    });
  }

  private buildTray(window: BrowserWindow): void {
    this.trayProvider.buildTray(
      this.trayProvider.getTray().map((item) => {
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
    this.menuProvider.buildMenu(
      this.menuProvider.getMenu().map((item) => {
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
