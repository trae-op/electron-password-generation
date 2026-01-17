import { RgModule } from "@traeop/electron-modular";
import { MenuService } from "./service.js";

@RgModule({
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
