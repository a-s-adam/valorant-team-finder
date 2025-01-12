import type { AxiosRequestConfig as OriginalAxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends OriginalAxiosRequestConfig {
  headers: {
    Authorization?: string;
    'Content-Type': string;
  };
}

export interface APIError {
  message: string;
  status: number;
} 