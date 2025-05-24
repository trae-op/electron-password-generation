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

  onInit({ getWindow }: TParamOnInit<TWindows["resource"]>) {
    const resourceWindow = getWindow("window:resource");

    ipcMainOn("openResource", async (event, { resourceId }) => {
      await resourceWindow.create({
        hash: `window:resource/${resourceId}`,
      });
    });

    ipcMainOn("getResource", async (event, { resourceId }) => {
      const item = await this.resourcesService.byId(resourceId);

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
