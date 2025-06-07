import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { AuthService } from "./service.js";

@RgModule({
  imports: [RestApiModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
