import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiService } from "./service.js";

@RgModule({
  providers: [RestApiService],
  exports: [RestApiService],
})
export class RestApiModule {}
