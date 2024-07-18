import { PROD } from "@/consts/environment";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = PROD
  ? "https://test-paskaita-2d5bbe94ef36.herokuapp.com/"
  : "http://localhost:3000/"; // patikrinama kokia aplinka

const config: AxiosRequestConfig = {
  baseURL,
};

export const axiosInstance = axios.create(config); // sukuriamas naujas instance su configu

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // istraukiamas tokenas

    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`; // pridedam Bearer tokena i headersus
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
