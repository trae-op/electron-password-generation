import { RgModule } from "@_traeop_/electron-modular";
import { MenuService } from "./service.js";

@RgModule({
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
