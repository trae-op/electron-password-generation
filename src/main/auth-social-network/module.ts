import { RgModule } from "../@core/decorators/rg-module.js";
import { AuthSocialNetworkIpc } from "./ipc.js";
import { AuthSocialNetworkWindow } from "./window.js";
import { TwoFactorModule } from "../two-factor/module.js";

@RgModule({
  imports: [TwoFactorModule],
  ipc: [AuthSocialNetworkIpc],
  windows: [AuthSocialNetworkWindow],
})
export class AuthSocialNetworkModule {}
