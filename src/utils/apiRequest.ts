"use client";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
interface ApiResponse<T> {
  result: T | null;
  error: string | null;
}

export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  token?: string,
  data?: any
): Promise<ApiResponse<T>> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: {
      Authorization: token ? ` ${token}` : undefined,
      "Content-Type": "application/json",
    },
    maxBodyLength: Infinity,
  };
  try {
    const response: AxiosResponse<T> = await axios.request(config);
    console.log(config, response.data);
    return { result: response.data, error: null };
  } catch (err: any) {
    console.log(err);
    return { result: null, error: err.response?.data?.message || err.message };
  }
}
