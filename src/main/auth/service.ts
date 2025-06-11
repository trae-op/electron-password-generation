import { BrowserWindow } from "electron";
import { type AxiosRequestConfig } from "axios";
import { restApi, timers } from "../config.js";
import { Injectable } from "../@core/decorators/injectable.js";
import { RestApiService } from "../rest-api/service.js";
import {
  deleteFromElectronStorage,
  getElectronStorage,
  deleteStore,
} from "../$shared/store.js";
import { ipcWebContentsSend } from "../$shared/utils.js";
import { getWindow as getWindows } from "../@core/control-window/receive.js";

@Injectable()
export class AuthService {
  constructor(private restApiService: RestApiService) {}

  private getAuthorization(): AxiosRequestConfig["headers"] {
    const token = getElectronStorage("authToken");

    if (token !== undefined) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }

    return;
  }

  async access<R extends { ok: boolean }>(): Promise<R | undefined> {
    const response = await this.restApiService.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.access}`,
      {
        headers: this.getAuthorization(),
        isCache: true,
      }
    );

    if (response.error !== undefined) {
      const mainWindow = getWindows<TWindows["main"]>("window:main");
      if (response.status === 401 && mainWindow !== undefined) {
        this.logout(mainWindow);
      }
      return;
    }

    return response.data;
  }

  checkAuthenticated(
    window: BrowserWindow
  ): { isAuthenticated: boolean } | undefined {
    const cacheAccess = this.cacheAccess();
    if (cacheAccess !== undefined) {
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: cacheAccess.ok,
      });

      return {
        isAuthenticated: true,
      };
    }
  }

  setCheckAccessInterval(window: BrowserWindow) {
    const interval = setInterval(async () => {
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: false,
      });

      const response = await this.access();
      ipcWebContentsSend("sync", window.webContents, {
        isAuthenticated: (response !== undefined && response.ok) || true,
      });

      const authToken = getElectronStorage("authToken");
      if (authToken === undefined) {
        clearInterval(interval);
      }
    }, timers.intervalCheckAuth);
  }

  cacheAccess(): { ok: boolean } | undefined {
    let access: { ok: boolean } | undefined = undefined;
    const cacheResponse = getElectronStorage("response");

    if (cacheResponse !== undefined) {
      access =
        cacheResponse[
          `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.access}`
        ];
    }

    if (access !== undefined) {
      return access;
    }

    return undefined;
  }

  logout(window: BrowserWindow) {
    deleteFromElectronStorage("authToken");
    deleteFromElectronStorage("response");
    deleteFromElectronStorage("userId");
    deleteStore("masterKey");
    deleteFromElectronStorage("twoFactorSecret");
    ipcWebContentsSend("authSocialNetwork", window.webContents, {
      isAuthenticated: false,
    });
  }
}
