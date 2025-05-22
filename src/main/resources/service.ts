import { type AxiosRequestConfig } from "axios";
import { restApi } from "../config.js";
import { Injectable } from "../@core/decorators/injectable.js";
import { RestApiService } from "../rest-api/service.js";
import { getElectronStorage } from "../$shared/store.js";

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
      return;
    }

    return response.data;
  }
}
