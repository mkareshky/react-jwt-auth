import axios from "axios";
import { getToken } from "./auth";

const APP_API_URL = 'http://localhost:3000/';

const getUrl = () => `${APP_API_URL}`;

export const getAxiosClient = () => {
  const baseURL = getUrl();
  const axiosClient = axios.create({ baseURL });
  const authToken = getToken();

  if (authToken === null || authToken === undefined) {
    axiosClient.defaults.headers.common.Authorization = null;
  } else {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
  return axiosClient;
};