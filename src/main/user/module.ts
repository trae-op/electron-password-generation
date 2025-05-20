import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { UserService } from "./service.js";

@RgModule({
  imports: [RestApiModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
