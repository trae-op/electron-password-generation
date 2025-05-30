import { RgModule } from "../@core/decorators/rg-module.js";
import { MasterKeyIpc } from "./ipc.js";
import { MasterKeyWindow } from "./window.js";
import { TwoFactorModule } from "../two-factor/module.js";

@RgModule({
  imports: [TwoFactorModule],
  ipc: [MasterKeyIpc],
  windows: [MasterKeyWindow],
})
export class MasterKeyModule {}
