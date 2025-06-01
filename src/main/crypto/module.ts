import { RgModule } from "../@core/decorators/rg-module.js";
import { CryptoService } from "./service.js";

@RgModule({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
