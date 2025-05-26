import { BrowserWindow } from "electron";
import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";
import { ResourcesService } from "../service.js";

@WindowManager<TWindows["updateResource"]>({
  hash: "window/resource/update",
  isCache: true,
  options: {
    alwaysOnTop: true,
    width: 600,
    height: 600,
  },
})
export class UpdateWindow implements TWindowManager {
  constructor(private resourcesService: ResourcesService) {}

  onDidFinishLoad(window: BrowserWindow): void {
    window.webContents.openDevTools();
  }
}
