import { BrowserWindow } from "electron";
import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";
import { ipcWebContentsSend } from "../../$shared/utils.js";
import { TwoFactorRestApiService } from "../services/rest-api.js";

@WindowManager<TWindows["twoFactorQA"]>({
  name: "window:two-factor-qa",
  isCache: true,
  options: {
    width: 500,
    height: 500,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
  },
})
export class TwoFactorQAWindow implements TWindowManager {
  constructor(private twoFactorRestApiService: TwoFactorRestApiService) {}

  async onDidFinishLoad(window: BrowserWindow) {
    const response = await this.twoFactorRestApiService.generateQA();

    if (response !== undefined) {
      ipcWebContentsSend("twoFactorQA", window.webContents, response);
    }
  }
}
