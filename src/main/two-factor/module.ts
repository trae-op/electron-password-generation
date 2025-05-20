import { RgModule } from "../@core/decorators/rg-module.js";
import { TwoFactorIpc } from "./ipc.js";
import { TwoFactorQAWindow } from "./windows/qa.js";
import { TwoFactorVerifyWindow } from "./windows/verify.js";
import { TwoFactorWindowsFactoryService } from "./services/windows-factory.js";
import { RestApiModule } from "../rest-api/module.js";
import { TwoFactorRestApiService } from "./services/rest-api.js";
import { UserModule } from "../user/module.js";

@RgModule({
  imports: [RestApiModule, UserModule],
  ipc: [TwoFactorIpc],
  windows: [TwoFactorQAWindow, TwoFactorVerifyWindow],
  providers: [TwoFactorWindowsFactoryService, TwoFactorRestApiService],
  exports: [TwoFactorWindowsFactoryService],
})
export class TwoFactorModule {}
