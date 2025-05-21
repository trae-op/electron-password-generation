import { IpcHandler } from "../@core/decorators/ipc-handler.js";
import { ipcMainOn } from "../$shared/utils.js";
import { UserService } from "./service.js";
import { getElectronStorage } from "../$shared/store.js";

@IpcHandler()
export class UserIpc {
  constructor(private userService: UserService) {}

  onInit(): void {
    ipcMainOn("checkUser", async (event) => {
      const userId = getElectronStorage("userId");
      const user = userId ? await this.userService.userById(userId) : undefined;

      event.reply("checkUser", {
        user,
      });
    });
  }
}
