import { ipcMainOn } from "../$shared/utils.js";
import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import type {
  TIpcHandlerInterface,
  TParamOnInit,
} from "../@core/types/ipc-handler.js";
import { ResourcesService } from "./service.js";

@IpcHandler()
export class ResourcesIpc implements TIpcHandlerInterface {
  constructor(private resourcesService: ResourcesService) {}

  onInit({ getWindow }: TParamOnInit<TWindows["updateResource"]>) {
    const updateResourceWindow = getWindow("window/resource/update");

    ipcMainOn("openUpdateResource", async (event, { id }) => {
      await updateResourceWindow.create({
        hash: `window/resource/update/${id}`,
      });
    });

    ipcMainOn("getResource", async (event, { id }) => {
      const item = await this.resourcesService.byId(id);

      event.reply("getResource", {
        item,
      });
    });

    ipcMainOn("resources", async (event) => {
      const resources = await this.resourcesService.list();

      event.reply("resources", {
        items: resources || [],
      });
    });
  }
}
