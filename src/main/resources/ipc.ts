// import { ipcMainOn } from "../$shared/utils.js";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
// import { getWindow as getWindows } from "../@core/control-window/receive.js";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "../@core/types/ipc-handler.js";
import { ResourcesService } from "./service.js";

@IpcHandler()
export class ResourcesIpc implements TIpcHandlerInterface {
  constructor(private resourcesService: ResourcesService) {}

  async onInit({ getWindow }: TParamOnInit<TWindows["resource"]>) {
    const resourceWindow = getWindow("window:resource");
    // const window = await resourceWindow.create();
  }
}
