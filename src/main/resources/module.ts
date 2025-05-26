import { RgModule } from "../@core/decorators/rg-module.js";
import { RestApiModule } from "../rest-api/module.js";
import { ResourcesIpc } from "./ipc.js";
import { ResourcesService } from "./service.js";
import { UpdateWindow } from "./windows/update.js";
import { AddWindow } from "./windows/add.js";

@RgModule({
  imports: [RestApiModule],
  ipc: [ResourcesIpc],
  windows: [UpdateWindow, AddWindow],
  providers: [ResourcesService],
})
export class ResourcesModule {}
