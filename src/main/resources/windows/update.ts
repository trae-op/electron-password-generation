import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";

@WindowManager<TWindows["updateResource"]>({
  hash: "window/resource/update",
  isCache: true,
  options: {
    alwaysOnTop: true,
    width: 400,
    height: 500,
  },
})
export class UpdateWindow implements TWindowManager {
  constructor() {}

  onDidFinishLoad(): void {}
}
