import { appConfig } from "./appConfig";
import axios, {
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
	AxiosHeaderValue,
} from "axios";

const apiInstance = axios.create({
	baseURL: appConfig.baseUrl,
});

const setupAxiosInterceptorsRequestApi = (token: string) => {
	apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
		if (config.headers) {
			config.headers["Authorization"] = `Bearer ${token}`;
		} else {
			config.headers = {
				Authorization: `Bearer ${token}` as AxiosHeaderValue,
			} as AxiosRequestHeaders;
		}
		return config;
	});
};

const setupAxiosInterceptorsResponseApi = (logout: () => void) => {
	apiInstance.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error && error.response.status === 401) {
				logout();
			}
			return Promise.reject(error);
		}
	);
};

const api = apiInstance;

export {
	api,
	setupAxiosInterceptorsRequestApi,
	setupAxiosInterceptorsResponseApi,
};
