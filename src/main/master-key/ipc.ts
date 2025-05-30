import { BrowserWindow } from "electron";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import { getWindow as getWindows } from "../@core/control-window/receive.js";
import { TParamOnInit } from "../@core/types/ipc-handler.js";
import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
} from "../$shared/utils.js";
import { setElectronStorage, getElectronStorage } from "../$shared/store.js";

@IpcHandler()
export class MasterKeyIpc {
  masterKeyWindow: BrowserWindow | undefined;

  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["masterKey"]>): void {
    const masterKeyWindow = getWindow("window:master-key");

    ipcMainOn("masterKey", async () => {
      this.masterKeyWindow = await masterKeyWindow.create();
    });

    this.ipcGetMasterKey();
    this.ipcPostMasterKey();
  }

  private ipcPostMasterKey(): void {
    ipcMainHandle("postMasterKey", async (payload) => {
      if (payload !== undefined) {
        setElectronStorage("masterKey", payload.key);
      }

      if (this.masterKeyWindow !== undefined) {
        this.masterKeyWindow.hide();
      }

      this.getMasterKey();
      return undefined;
    });
  }

  private ipcGetMasterKey(): void {
    ipcMainOn("checkMasterKey", async (event) => {
      const masterKey = getElectronStorage("masterKey");

      event.reply("masterKey", {
        isMasterKey: Boolean(masterKey),
      });
    });
  }

  private getMasterKey(): void {
    const masterKey = getElectronStorage("masterKey");
    const mainWindow = getWindows<TWindows["main"]>("window:main");
    if (mainWindow !== undefined) {
      ipcWebContentsSend("masterKey", mainWindow.webContents, {
        isMasterKey: Boolean(masterKey),
      });
    }
  }
}
