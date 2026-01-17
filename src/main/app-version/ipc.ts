import { app } from "electron";
import { IpcHandler } from "@traeop/electron-modular";
import type { TIpcHandlerInterface } from "@traeop/electron-modular";
import { ipcMainHandle } from "../$shared/utils.js";

@IpcHandler()
export class AppVersionIpc implements TIpcHandlerInterface {
  constructor() {}

  onInit() {
    const currentVersion = app.getVersion();
    ipcMainHandle("getVersion", () => currentVersion);
  }
}
