import { BrowserWindow } from "electron";
import { ipcMainOn, ipcWebContentsSend } from "../$shared/utils.js";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import { getWindow as getWindows } from "../@core/control-window/receive.js";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "../@core/types/ipc-handler.js";
import { ResourcesService } from "./services/resources.js";
import { CryptoService } from "./services/crypto.js";
import {
  TWindowCreate,
  TWindowFactory,
} from "../@core/types/window-factory.js";
import { TEncryptedVault } from "./services/types.js";

@IpcHandler()
export class ResourcesIpc implements TIpcHandlerInterface {
  addResourceWindow: BrowserWindow | undefined;
  updateResourceWindow: BrowserWindow | undefined;

  constructor(
    private resourcesService: ResourcesService,
    private cryptoService: CryptoService
  ) {}

  onInit({
    getWindow,
  }: TParamOnInit<TWindows["updateResource"] | TWindows["addResource"]>) {
    const updateResourceWindow = getWindow("window/resource/update");
    const addResourceWindow = getWindow("window/resource/add");
    const mainWindow = getWindows<TWindows["main"]>("window:main");

    this.ipcOpenUpdateResource(updateResourceWindow);
    this.ipcOpenAddResource(addResourceWindow);
    this.ipcPostResource(mainWindow);
    this.ipcPutResource(mainWindow);
    this.ipcGetResource();
    this.ipcGetResources();
  }

  private ipcOpenUpdateResource(window: TWindowFactory): void {
    ipcMainOn("openUpdateResource", async (_, { id }) => {
      this.updateResourceWindow = await window.create({
        hash: `window/resource/update/${id}`,
      });
    });
  }

  private ipcOpenAddResource(window: TWindowFactory): void {
    ipcMainOn("openAddResource", async () => {
      this.addResourceWindow = await window.create();
    });
  }

  private ipcPutResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainOn("putResource", async (_, payload) => {
      let encryptedVault: TEncryptedVault | undefined;

      if (payload && payload.key && typeof payload.key === "string") {
        encryptedVault = await this.cryptoService.encrypt(
          "darkmanxDMX1988",
          payload.key
        );
      }

      if (
        this.updateResourceWindow !== undefined &&
        typeof payload.name === "string" &&
        mainWindow !== undefined &&
        encryptedVault !== undefined &&
        payload.id !== undefined
      ) {
        await this.resourcesService.put(payload.id, {
          name: payload.name,
          key: encryptedVault.encryptedData,
          iv: encryptedVault.iv,
          salt: encryptedVault.salt,
        });
        const resources = await this.getResources();
        this.updateResourceWindow.hide();
        ipcWebContentsSend("resources", mainWindow.webContents, resources);
      }
    });
  }

  private ipcPostResource(mainWindow: BrowserWindow | undefined): void {
    ipcMainOn("postResource", async (_, payload) => {
      let encryptedVault: TEncryptedVault | undefined;

      if (payload && payload.key && typeof payload.key === "string") {
        encryptedVault = await this.cryptoService.encrypt(
          "darkmanxDMX1988",
          payload.key
        );
      }

      if (
        this.addResourceWindow !== undefined &&
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
        this.addResourceWindow.hide();
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
}
