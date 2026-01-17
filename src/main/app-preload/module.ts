import { RgModule } from "@traeop/electron-modular";
import { AppPreloadIpc } from "./ipc.js";
import { AppPreloadWindow } from "./window.js";

@RgModule({
  ipc: [AppPreloadIpc],
  windows: [AppPreloadWindow],
})
export class AppPreloadModule {}
