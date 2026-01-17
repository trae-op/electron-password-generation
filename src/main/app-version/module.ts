import { RgModule } from "@traeop/electron-modular";
import { AppVersionIpc } from "./ipc.js";

@RgModule({
  ipc: [AppVersionIpc],
})
export class AppVersionModule {}
