import { BrowserWindow, clipboard } from "electron";
import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
} from "../../$shared/utils.js";
import { IpcHandler } from "../../@core/decorators/ipc-handler.js";
import { getWindow as getWindows } from "../../@core/control-window/receive.js";
import type { TIpcHandlerInterface } from "../../@core/types/ipc-handler.js";
import { ResourcesService } from "../services/resources.js";
import { CryptoService } from "../../crypto/service.js";
import { TEncryptedVault } from "../services/types.js";
import { CacheWindowsService } from "../services/cacheWindows.js";
import { getElectronStorage } from "../../$shared/store.js";
import { TrayService } from "../../tray/service.js";

@IpcHandler()
export class ResourcesActionsIpc implements TIpcHandlerInterface {
  constructor(
    private resourcesService: ResourcesService,
    private cryptoService: CryptoService,
    private cacheWindowsService: CacheWindowsService,
    private trayService: TrayService
  ) {}

  onInit() {
    const mainWindow = getWindows<TWindows["main"]>("window:main");

    this.ipcDeleteResource(mainWindow);
    this.ipcPostResource(mainWindow);
    this.ipcPutResource(mainWindow);
    this.ipcGetResources();
    this.ipcGetResource();
    this.ipcCancelDeleteResource();
  }

  private ipcCancelDeleteResource(): void {
    ipcMainOn("cancelDeleteResource", () => {
      const deleteResourceWindow = this.cacheWindowsService.getResourceWindows(
        "deleteResourceWindow"
      );

      if (deleteResourceWindow !== undefined) {
        deleteResourceWindow.hide();
      }
    });
  }

  private ipcPutResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainHandle("putResource", async (payload) => {
      let encryptedVault: TEncryptedVault | undefined;
      const updateResourceWindow = this.cacheWindowsService.getResourceWindows(
        "updateResourceWindow"
      );
      const masterKey = getElectronStorage("masterKey");

      if (
        masterKey !== undefined &&
        payload !== undefined &&
        payload.key &&
        typeof payload.key === "string"
      ) {
        encryptedVault = await this.cryptoService.encrypt(
          masterKey,
          payload.key
        );
      }

      if (
        payload !== undefined &&
        updateResourceWindow !== undefined &&
        typeof payload.name === "string" &&
        mainWindow !== undefined &&
        payload.id !== undefined
      ) {
        await this.resourcesService.put(payload.id, {
          name: payload.name,
          ...(encryptedVault !== undefined
            ? {
                key: encryptedVault.encryptedData,
                iv: encryptedVault.iv,
                salt: encryptedVault.salt,
              }
            : {}),
        });
        const resources = await this.getResources();

        updateResourceWindow.hide();
        ipcWebContentsSend("resources", mainWindow.webContents, resources);
      }

      return undefined;
    });
  }

  private ipcPostResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainHandle("postResource", async (payload) => {
      let encryptedVault: TEncryptedVault | undefined;
      const addResourceWindow =
        this.cacheWindowsService.getResourceWindows("addResourceWindow");
      const masterKey = getElectronStorage("masterKey");

      if (
        masterKey !== undefined &&
        payload !== undefined &&
        payload.key &&
        typeof payload.key === "string"
      ) {
        encryptedVault = await this.cryptoService.encrypt(
          masterKey,
          payload.key
        );
      }

      if (
        payload !== undefined &&
        addResourceWindow !== undefined &&
        typeof payload.name === "string" &&
        mainWindow !== undefined &&
        encryptedVault !== undefined
      ) {
        await this.resourcesService.post({
          name: payload.name,
          key: encryptedVault.encryptedData,
          iv: encryptedVault.iv,
          salt: encryptedVault.salt,
        });
        const resources = await this.getResources();

        addResourceWindow.hide();
        ipcWebContentsSend("resources", mainWindow.webContents, resources);
      }

      return undefined;
    });
  }

  private ipcGetResource(): void {
    ipcMainOn("getResource", async (event, { id }) => {
      const item = await this.resourcesService.byId(id);

      event.reply("getResource", {
        item,
      });
    });
  }

  private ipcGetResources(): void {
    ipcMainOn("resources", async (event) => {
      const resources = await this.getResources();

      if (resources !== undefined) {
        this.updateTrayMenu(resources.items);
      }

      event.reply("resources", resources);
    });
  }

  private async getResources(): Promise<{
    items: TResource[];
  }> {
    const resources = await this.resourcesService.list();

    return {
      items: resources || [],
    };
  }

  private ipcDeleteResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainHandle("deleteResource", async (payload) => {
      const deleteResourceWindow = this.cacheWindowsService.getResourceWindows(
        "deleteResourceWindow"
      );

      if (
        payload &&
        payload.id &&
        deleteResourceWindow !== undefined &&
        mainWindow !== undefined
      ) {
        await this.resourcesService.delete(payload.id);

        const resources = await this.getResources();

        deleteResourceWindow.hide();
        ipcWebContentsSend("resources", mainWindow.webContents, resources);
      }

      return undefined;
    });
  }

  private updateTrayMenu(resources: TResource[]) {
    if (resources.length) {
      this.trayService.buildTray(
        this.trayService.trayMenu.map((item) => {
          if (item.name === "resources") {
            item.visible = true;
            item.submenu = resources.map((resource) => ({
              label: resource.name,
              click: async () => {
                this.copyMasterKey(resource);
              },
            }));
          }

          return item;
        })
      );
    } else {
      this.trayService.buildTray(
        this.trayService.trayMenu.map((item) => {
          if (item.name === "resources") {
            item.visible = false;
          }

          return item;
        })
      );
    }
  }

  private async copyMasterKey(resource: TResource) {
    const masterKey = getElectronStorage("masterKey");
    if (masterKey !== undefined && resource.salt !== null) {
      const encryptedVault = await this.cryptoService.decrypt(masterKey, {
        iv: resource.iv,
        salt: resource.salt,
        encryptedData: resource.key,
      });
      clipboard.writeText(encryptedVault);
    }
  }
}
