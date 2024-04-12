import axios, { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  statusCode?: Number;
  message?: String;
}

const url = `https://15.207.19.227:4000/api/`;

export const getCall = async (
  location: string,
  dataParams: Record<string, any>
): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios.get(url + location, {
      params: dataParams,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false };
  }
};

export const postCall = async (
  location: string,
  dataParams: Record<string, any>,
  config?: any
): Promise<ApiResponse> => {
  config = {
    headers: {
      ...config?.headers,
    },
  };
  try {
    const response: AxiosResponse = await axios.post(
    url + location,
      dataParams,
      config
    );
    localStorage.setItem('user', response.data.user._id);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      statusCode: error?.response.status,
      message: error?.response.data.message,
    };
  }
};

export const patchCall = async (
  location: string,
  dataParams: Record<string, any>,
  config?: any
): Promise<ApiResponse> => {
  config = {
    headers: {
      ...config?.headers,
    },
  };
  try {
    const response: AxiosResponse = await axios.patch(
       url + location,
      dataParams,
      config
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      statusCode: error?.response.status,
      message: error?.response.data.message,
    };
  }
};
