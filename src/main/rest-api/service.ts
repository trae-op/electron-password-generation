import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { Injectable } from "../@core/decorators/injectable.js";
import { restApi } from "../config.js";
import type { ApiResponse, RequestOptions } from "./types.js";

@Injectable()
export class RestApiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: restApi.urls.base,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error)
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      status: response.status,
      data: response.data,
      error: undefined,
    };
  }

  private handleError(error: AxiosError): ApiResponse<any> {
    if (error.response) {
      return {
        status: error.response.status,
        error: {
          message:
            error.message ||
            `Request failed with status ${error.response.status}`,
          code: error.code,
          details: error.response.data,
        },
        data: undefined,
      };
    } else if (error.request) {
      // The request was sent, but there was no response.
      return {
        status: 0,
        error: { message: "No response received from the server" },
        data: undefined,
      };
    } else {
      // An error occurred while configuring the query.
      return {
        status: 0,
        error: { message: error.message || "Request setup error" },
        data: undefined,
      };
    }
  }

  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        endpoint,
        options
      );
      return this.handleResponse<T>(response);
    } catch (error: any) {
      return this.handleError(error as AxiosError);
    }
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        endpoint,
        data,
        options
      );
      return this.handleResponse<T>(response);
    } catch (error: any) {
      return this.handleError(error as AxiosError);
    }
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        endpoint,
        data,
        options
      );
      return this.handleResponse<T>(response);
    } catch (error: any) {
      return this.handleError(error as AxiosError);
    }
  }

  async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        endpoint,
        options
      );
      return this.handleResponse<T>(response);
    } catch (error: any) {
      return this.handleError(error as AxiosError);
    }
  }
}
