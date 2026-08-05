// services/api/apiClient.ts
import axios, { type AxiosError } from "axios";
import { AppError, type ApiErrorResponse } from "@/lib/error/AppError";
export const apiClient = axios.create({ baseURL: "/api" });

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Transform to AppError
    if (error.response?.data) {
      return Promise.reject(
        AppError.fromResponse(error.response.data)
      );
    }
 
    // Network error
    if (!error.response) {
      return Promise.reject(
        new AppError('Network error', 'NETWORK_ERROR', 0)
      );
    }
 
    return Promise.reject(error);
  }
);