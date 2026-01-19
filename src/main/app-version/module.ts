import { RgModule } from "@_traeop_/electron-modular";
import { AppVersionIpc } from "./ipc.js";

@RgModule({
  ipc: [AppVersionIpc],
})
export class AppVersionModule {}
