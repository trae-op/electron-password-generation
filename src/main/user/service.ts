import { type AxiosRequestConfig } from "axios";
import { messages, restApi } from "../config.js";
import { Injectable } from "../@core/decorators/injectable.js";
import { RestApiService } from "../rest-api/service.js";
import { getElectronStorage } from "../$shared/store.js";

@Injectable()
export class UserService {
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

  async userById<R extends TUser>(id: string): Promise<R | undefined> {
    const response = await this.restApiService.get<R>(
      `${restApi.urls.base}${restApi.urls.baseApi}${
        restApi.urls.user.base
      }${restApi.urls.user.byId(id)}`,
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
