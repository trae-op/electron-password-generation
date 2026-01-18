import { getWindow, Injectable } from "@_traeop_/electron-modular";
import { ipcWebContentsSend } from "../../$shared/utils.js";

@Injectable()
export class SendUpdateInfoService {
  constructor() {}

  sendUpdateInfo(payload: TUpdateData) {
    const updateWindow = getWindow<TWindows["updateApp"]>("window:update-app");
    const mainWindow = getWindow<TWindows["main"]>("window:main");

    if (updateWindow !== undefined || mainWindow !== undefined) {
      [updateWindow, mainWindow].forEach((window) => {
        if (window !== undefined) {
          ipcWebContentsSend("updateApp", window.webContents, payload);
        }
      });
    }
  }
}
