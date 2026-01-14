import { WindowManager } from "../../@core/decorators/window-manager.js";
import { TWindowManager } from "../../@core/types/window-manager.js";

@WindowManager<TWindows["addResource"]>({
  hash: "window/resource/add",
  isCache: true,
  options: {
    width: 400,
    height: 500,
  },
})
export class AddWindow implements TWindowManager {
  constructor() {}

  onDidFinishLoad(): void {}
}
