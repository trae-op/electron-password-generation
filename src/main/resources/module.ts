import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { ResourcesIpc } from "./ipc.js";
import { ResourcesService } from "./services/resources.js";
import { CryptoService } from "./services/crypto.js";
import { UpdateWindow } from "./windows/update.js";
import { AddWindow } from "./windows/add.js";
import { DeleteWindow } from "./windows/delete.js";

@RgModule({
  imports: [RestApiModule],
  ipc: [ResourcesIpc],
  windows: [UpdateWindow, AddWindow, DeleteWindow],
  providers: [ResourcesService, CryptoService],
})
export class ResourcesModule {}
