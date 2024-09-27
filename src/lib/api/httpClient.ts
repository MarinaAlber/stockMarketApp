import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

import {HttpClient, XHR} from './types';
import * as config from './config';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Authorization: config.API_AUTH,
    Accept: config.CONTENT_TYPE,
  },
});

const returnHttpClient = (
  xhr: XHR,
  controller?: AbortController,
): HttpClient => ({
  xhr,
  abortRequest: () => controller?.abort(),
});

export const httpClient = {
  get: (url: string, config?: AxiosRequestConfig): HttpClient => {
    const controller = new AbortController();
    const getXHRCall = axiosInstance.get(url, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: getXHRCall,
      };
    }

    return returnHttpClient(getXHRCall, controller);
  },
  head: (url: string, config?: AxiosRequestConfig): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.head(url, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpClient(postXHRCall, controller);
  },
  post: (
    url: string,
    data?: object | string,
    config?: AxiosRequestConfig,
  ): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.post(url, data, {
      ...config,

      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpClient(postXHRCall, controller);
  },
  put: (
    url: string,
    data?: object | string,
    config?: AxiosRequestConfig,
  ): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.put(url, data, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpClient(postXHRCall, controller);
  },
  patch: (
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
  ): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.patch(url, data, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpClient(postXHRCall, controller);
  },
  delete: (url: string, config?: AxiosRequestConfig): HttpClient => {
    const controller = new AbortController();
    const postXHRCall = axiosInstance.delete(url, {
      ...config,
      signal: config?.signal || controller.signal,
    });

    if (config?.signal) {
      return {
        xhr: postXHRCall,
      };
    }

    return returnHttpClient(postXHRCall, controller);
  },

  checkIsCancelError: (error: AxiosError) => {
    return axios.isCancel(error);
  },
};
