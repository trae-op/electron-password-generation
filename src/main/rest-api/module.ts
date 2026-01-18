import { RgModule } from "@_traeop_/electron-modular";
import { RestApiService } from "./service.js";

@RgModule({
  providers: [RestApiService],
  exports: [RestApiService],
})
export class RestApiModule {}
