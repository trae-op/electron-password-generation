import { app, BrowserWindow } from "electron";
import pkg from "electron-updater";
import { destroyWindows } from "@traeop/electron-modular";
import { IpcHandler } from "@traeop/electron-modular";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "@traeop/electron-modular";
import { ipcMainOn } from "../$shared/utils.js";
import { OpenLatestVersionService } from "./services/mac-os/open-latest-version.js";
import { Inject } from "@traeop/electron-modular";
import { UPDATER_TRAY_PROVIDER } from "./tokens.js";
import type { TUpdaterTrayProvider } from "./types.js";

const { autoUpdater } = pkg;

@IpcHandler()
export class UpdaterIpc implements TIpcHandlerInterface {
  private updateAppWindow: BrowserWindow | undefined = undefined;

  constructor(
    @Inject(UPDATER_TRAY_PROVIDER) private trayProvider: TUpdaterTrayProvider,
    private openLatestVersionService: OpenLatestVersionService,
  ) {}

  onInit({ getWindow }: TParamOnInit<TWindows["updateApp"]>) {
    const updateAppWindow = getWindow("window:update-app");

    this.trayProvider.buildTray(
      this.trayProvider.getTray().map((item) => {
        if (item.name === "check-update") {
          item.click = async () => {
            if (this.updateAppWindow) {
              this.updateAppWindow.show();
            } else {
              this.updateAppWindow = await updateAppWindow.create();
            }
          };
        }

        return item;
      }),
    );

    ipcMainOn("restart", () => {
      autoUpdater.quitAndInstall();
    });

    ipcMainOn("openLatestVersion", (_, { updateFile }) => {
      this.openLatestVersionService.openLatestVersion(updateFile);
      this.trayProvider.destroyTray();
      destroyWindows();
      app.quit();
    });
  }
}
