import { RgModule } from "../@core/decorators/rg-module.js";
import { MasterKeyIpc } from "./ipc.js";
import { MasterKeyWindow } from "./window.js";
import { ResourcesModule } from "../resources/module.js";
import { CryptoModule } from "../crypto/module.js";

@RgModule({
  imports: [ResourcesModule, CryptoModule],
  ipc: [MasterKeyIpc],
  windows: [MasterKeyWindow],
})
export class MasterKeyModule {}
