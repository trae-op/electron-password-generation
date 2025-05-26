import { BrowserWindow } from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { ResourcesService } from "./service.js";

@WindowManager<TWindows["resource"]>({
  hash: "window/resource",
  isCache: true,
  options: {
    alwaysOnTop: true,
    width: 600,
    height: 600,
  },
})
export class ResourceWindow implements TWindowManager {
  constructor(private resourcesService: ResourcesService) {}

  onDidFinishLoad(window: BrowserWindow): void {
    window.webContents.openDevTools();
  }
}
