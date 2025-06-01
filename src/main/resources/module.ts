import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { CryptoModule } from "../crypto/module.js";
import { ResourcesActionsIpc } from "./ipc/actions.js";
import { ResourcesOpenIpc } from "./ipc/open.js";
import { ResourcesService } from "./services/resources.js";
import { CacheWindowsService } from "./services/cacheWindows.js";
import { UpdateWindow } from "./windows/update.js";
import { AddWindow } from "./windows/add.js";
import { DeleteWindow } from "./windows/delete.js";

@RgModule({
  imports: [RestApiModule, CryptoModule],
  ipc: [ResourcesActionsIpc, ResourcesOpenIpc],
  windows: [UpdateWindow, AddWindow, DeleteWindow],
  providers: [ResourcesService, CacheWindowsService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
