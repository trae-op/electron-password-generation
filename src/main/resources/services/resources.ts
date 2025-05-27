import { type AxiosRequestConfig } from "axios";
import { restApi } from "../../config.js";
import { Injectable } from "../../@core/decorators/injectable.js";
import { RestApiService } from "../../rest-api/service.js";
import { getElectronStorage } from "../../$shared/store.js";
import { TPostBody, TPutBody } from "./types.js";
import { dialog } from "electron";

@Injectable()
export class ResourcesService {
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

  async byId<R extends TResource>(id: string): Promise<R | undefined> {
    const response = await this.restApiService.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${
        restApi.urls.resources.base
      }${restApi.urls.resources.byId(id)}`,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async post<R extends TResource>(body: TPostBody): Promise<R | undefined> {
    const response = await this.restApiService.post<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.resources.base}`,
      body,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async put<R extends TResource>(
    id: string,
    body: TPutBody
  ): Promise<R | undefined> {
    const response = await this.restApiService.put<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${
        restApi.urls.resources.base
      }${restApi.urls.resources.byId(id)}`,
      body,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }

  async list<R extends TResource[]>(): Promise<R | undefined> {
    const response = await this.restApiService.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.resources.base}`,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: `Something wrong with server! ${response.error.code || ""}`,
        message: response.error.message,
      });
      return;
    }

    return response.data;
  }
}
