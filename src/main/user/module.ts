import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { UserService } from "./service.js";
import { UserIpc } from "./ipc.js";

@RgModule({
  imports: [RestApiModule],
  ipc: [UserIpc],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
