import { RgModule } from "@_traeop_/electron-modular";
import { TrayService } from "./service.js";

@RgModule({
  providers: [TrayService],
  exports: [TrayService],
})
export class TrayModule {}
