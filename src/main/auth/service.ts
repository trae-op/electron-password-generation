import { type AxiosRequestConfig } from "axios";
import { messages, restApi } from "../config.js";
import { Injectable } from "../@core/decorators/injectable.js";
import { RestApiService } from "../rest-api/service.js";
import { getElectronStorage } from "../$shared/store.js";

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
      }
    );

    if (response.error !== undefined) {
      return;
    }

    return response.data;
  }
}
