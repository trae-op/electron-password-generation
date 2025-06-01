import { BrowserWindow } from "electron";
import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";

@WindowManager<TWindows["deleteResource"]>({
  hash: "window/resource/delete",
  isCache: true,
  options: {
    alwaysOnTop: true,
    width: 330,
    height: 170,
  },
})
export class DeleteWindow implements TWindowManager {
  constructor() {}

  onDidFinishLoad(window: BrowserWindow): void {}
}
