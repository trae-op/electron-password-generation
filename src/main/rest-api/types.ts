import { type AxiosRequestConfig } from "axios";

export interface ApiResponse<T> {
  data?: T;
  error?: {
    code?: string | number;
    message: string;
    details?: any;
  };
  status: number;
}

export interface RequestOptions extends AxiosRequestConfig {
  params?: Record<string, any>;
  isCache?: boolean;
}
