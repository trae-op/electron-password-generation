import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { ResourcesIpc } from "./ipc.js";
import { ResourcesService } from "./service.js";
import { ResourceWindow } from "./window.js";

@RgModule({
  imports: [RestApiModule],
  ipc: [ResourcesIpc],
  windows: [ResourceWindow],
  providers: [ResourcesService],
})
export class ResourcesModule {}
