import { RgModule } from "@traeop/electron-modular";
import { RestApiService } from "./service.js";

@RgModule({
  providers: [RestApiService],
  exports: [RestApiService],
})
export class RestApiModule {}
