import { BrowserWindow, clipboard } from "electron";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import { getWindow as getWindows } from "../@core/control-window/receive.js";
import { TParamOnInit } from "../@core/types/ipc-handler.js";
import { ResourcesService } from "../resources/services/resources.js";
import { CryptoService } from "../resources/services/crypto.js";
import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
} from "../$shared/utils.js";
import {
  setElectronStorage,
  getElectronStorage,
  deleteFromElectronStorage,
} from "../$shared/store.js";

@IpcHandler()
export class MasterKeyIpc {
  masterKeyWindow: BrowserWindow | undefined;

  constructor(
    private resourcesService: ResourcesService,
    private cryptoService: CryptoService
  ) {}

  onInit({ getWindow }: TParamOnInit<TWindows["masterKey"]>): void {
    const masterKeyWindow = getWindow("window:master-key");

    ipcMainOn("masterKey", async () => {
      this.masterKeyWindow = await masterKeyWindow.create();
    });

    this.ipcGetMasterKey();
    this.ipcPostMasterKey();
    this.ipcDeleteMasterKey();
    this.ipcCopyMasterKey();
  }

  private ipcPostMasterKey(): void {
    ipcMainHandle("postMasterKey", async (payload) => {
      if (payload !== undefined) {
        setElectronStorage("masterKey", payload.key);
      }

      this.hideMasterKeyWindow();

      this.getMasterKey();
      return undefined;
    });
  }

  private ipcCopyMasterKey(): void {
    ipcMainHandle("copyMasterKey", async (payload) => {
      if (payload !== undefined) {
        const resource = await this.resourcesService.byId(payload.id);
        const masterKey = getElectronStorage("masterKey");

        if (
          masterKey !== undefined &&
          resource !== undefined &&
          resource.salt !== null
        ) {
          const encryptedVault = await this.cryptoService.decrypt(masterKey, {
            iv: resource.iv,
            salt: resource.salt,
            encryptedData: resource.key,
          });
          clipboard.writeText(encryptedVault);

          return {
            ok: true,
          };
        }
      }

      return undefined;
    });
  }

  private ipcGetMasterKey(): void {
    ipcMainOn("checkMasterKey", (event) => {
      const masterKey = getElectronStorage("masterKey");

      event.reply("masterKey", {
        isMasterKey: Boolean(masterKey),
      });
    });
  }

  private ipcDeleteMasterKey(): void {
    ipcMainOn("deleteMasterKey", () => {
      const masterKey = getElectronStorage("masterKey");

      if (masterKey !== undefined) {
        deleteFromElectronStorage("masterKey");
        this.getMasterKey();
        this.hideMasterKeyWindow();
      }
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

    if (this.masterKeyWindow !== undefined) {
      ipcWebContentsSend("masterKey", this.masterKeyWindow.webContents, {
        isMasterKey: Boolean(masterKey),
      });
    }
  }

  private hideMasterKeyWindow(): void {
    if (this.masterKeyWindow !== undefined) {
      this.masterKeyWindow.hide();
    }
  }
}
