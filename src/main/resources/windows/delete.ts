import { BrowserWindow } from "electron";
import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";

@WindowManager<TWindows["deleteResource"]>({
  hash: "window/resource/delete",
  isCache: true,
  options: {
    alwaysOnTop: true,
    width: 350,
    height: 190,
  },
})
export class DeleteWindow implements TWindowManager {
  constructor() {}

  onDidFinishLoad(window: BrowserWindow): void {}
}
