import { WindowManager } from "../@core/decorators/window-manager.js";
import { TWindowManager } from "../@core/types/window-manager.js";
import { CheckForUpdatesService } from "./services/check-for-updates.js";

@WindowManager<TWindows["updateApp"]>({
  hash: "window:update-app",
  isCache: true,
  options: {
    width: 365,
    height: 365,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
  },
})
export class UpdaterWindow implements TWindowManager {
  constructor(private checkForUpdatesService: CheckForUpdatesService) {}

  onDidFinishLoad(): void {
    this.checkForUpdatesService.checkForUpdates();
  }
}
