import { BrowserWindow } from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { ipcWebContentsSend } from "../$shared/utils.js";
import { getStore } from "../$shared/store.js";

@WindowManager<TWindows["masterKey"]>({
  hash: "window:master-key",
  isCache: true,
  options: {
    width: 350,
    height: 300,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
  },
})
export class MasterKeyWindow implements TWindowManager {
  isSync = false;
  constructor() {}

  onDidFinishLoad(): void {
    this.isSync = true;
  }

  onShow(window: BrowserWindow): void {
    if (this.isSync) {
      const masterKey = getStore("masterKey");

      ipcWebContentsSend("masterKey", window.webContents, {
        isMasterKey: Boolean(masterKey),
      });
    }
  }
}
