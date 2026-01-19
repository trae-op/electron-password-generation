import { RgModule } from "@_traeop_/electron-modular";
import { CryptoService } from "./service.js";

@RgModule({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
