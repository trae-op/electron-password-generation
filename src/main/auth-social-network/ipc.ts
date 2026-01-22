import { restApi } from "../config.js";
import { IpcHandler, type TParamOnInit } from "@devisfuture/electron-modular";
import { ipcMainOn } from "../$shared/utils.js";

@IpcHandler()
export class AuthSocialNetworkIpc {
  constructor() {}

  onInit({ getWindow }: TParamOnInit<TWindows["authSocialNetwork"]>): void {
    const authSocialNetworkWindow = getWindow("window:auth-social-network");

    ipcMainOn("authSocialNetwork", async (_, { providers }) => {
      authSocialNetworkWindow.create({
        loadURL: `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth[providers]}`,
        options: {
          webPreferences: {
            partition: "persist:auth",
          },
        },
      });
    });
  }
}
