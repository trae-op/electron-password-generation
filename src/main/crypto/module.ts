import { RgModule } from "@traeop/electron-modular";
import { CryptoService } from "./service.js";

@RgModule({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
