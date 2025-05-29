import { BrowserWindow } from "electron";
import { ipcMainOn, ipcWebContentsSend } from "../../$shared/utils.js";
import { IpcHandler } from "../../@core/decorators/ipc-handler.js";
import { getWindow as getWindows } from "../../@core/control-window/receive.js";
import type { TIpcHandlerInterface } from "../../@core/types/ipc-handler.js";
import { ResourcesService } from "../services/resources.js";
import { CryptoService } from "../services/crypto.js";
import { TEncryptedVault } from "../services/types.js";
import { CacheWindowsService } from "../services/cacheWindows.js";

@IpcHandler()
export class ResourcesActionsIpc implements TIpcHandlerInterface {
  constructor(
    private resourcesService: ResourcesService,
    private cryptoService: CryptoService,
    private cacheWindowsService: CacheWindowsService
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
    ipcMainOn("putResource", async (_, payload) => {
      let encryptedVault: TEncryptedVault | undefined;
      const updateResourceWindow = this.cacheWindowsService.getResourceWindows(
        "updateResourceWindow"
      );

      if (payload && payload.key && typeof payload.key === "string") {
        encryptedVault = await this.cryptoService.encrypt(
          "darkmanxDMX1988",
          payload.key
        );
      }

      if (
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
    });
  }

  private ipcPostResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainOn("postResource", async (_, payload) => {
      let encryptedVault: TEncryptedVault | undefined;
      const addResourceWindow =
        this.cacheWindowsService.getResourceWindows("addResourceWindow");

      if (payload && payload.key && typeof payload.key === "string") {
        encryptedVault = await this.cryptoService.encrypt(
          "darkmanxDMX1988",
          payload.key
        );
      }

      if (
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
    ipcMainOn("deleteResource", async (_, payload) => {
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
    });
  }
}
