import { type AxiosRequestConfig } from "axios";
import { messages, restApi } from "../../config.js";
import { Injectable } from "../../@core/decorators/injectable.js";
import { RestApiService } from "../../rest-api/service.js";
import { getElectronStorage } from "../../$shared/store.js";
import type {
  TResponseGenerate,
  TParamsAuthenticate,
  TResponseTwoFactorEnable,
  TResponseTwoFactorAuthenticate,
} from "./types.js";
import { dialog } from "electron";

@Injectable()
export class TwoFactorRestApiService {
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

  async generateQA<R extends TResponseGenerate>(): Promise<R | undefined> {
    const response = await this.restApiService.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.twoFactor}${restApi.urls.auth.generate}`,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: messages.auth.errorGenerateQA,
        message: `Failed: ${response.status} ${response.error?.message}`,
      });

      return;
    }

    return response.data;
  }

  async authenticate<R extends TResponseTwoFactorAuthenticate>({
    body,
  }: TParamsAuthenticate): Promise<R | undefined> {
    const response = await this.restApiService.post<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.twoFactor}${restApi.urls.auth.authenticate}`,
      body,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: messages.auth.errorGenerateQA,
        message: `Failed: ${response.status} ${response.error?.message}`,
      });

      return;
    }

    return response.data;
  }

  async enableTwoFactor<R extends TResponseTwoFactorEnable>({
    body,
  }: TParamsAuthenticate): Promise<R | undefined> {
    const response = await this.restApiService.post<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.twoFactor}${restApi.urls.auth.enable}`,
      body,
      {
        headers: this.getAuthorization(),
      }
    );

    if (response.error !== undefined) {
      dialog.showMessageBox({
        title: messages.auth.errorGenerateQA,
        message: `Failed: ${response.status} ${response.error?.message}`,
      });

      return;
    }

    return response.data;
  }
}
