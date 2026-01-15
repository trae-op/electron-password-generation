import { BrowserWindow } from "electron";
import { WindowManager } from "../../@core/decorators/window-manager.js";
import type { TWindowManager } from "../../types.js";

@WindowManager<TWindows["deleteResource"]>({
  hash: "window/resource/delete",
  isCache: true,
  options: {
    width: 350,
    height: 190,
  },
})
export class DeleteWindow implements TWindowManager {
  constructor() {}

  onWebContentsDidFinishLoad(window: BrowserWindow): void {}
}
