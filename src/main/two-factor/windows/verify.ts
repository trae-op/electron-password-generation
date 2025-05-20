import { BrowserWindow } from "electron";
import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";

@WindowManager<TWindows["twoFactorVerify"]>({
  name: "window:two-factor-verify",
  isCache: true,
  options: {
    width: 350,
    height: 300,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
  },
})
export class TwoFactorVerifyWindow implements TWindowManager {
  constructor() {}

  onDidFinishLoad(window: BrowserWindow) {}
}
