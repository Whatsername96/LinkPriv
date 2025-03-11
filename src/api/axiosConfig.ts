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
			if (token.length > 0) {
				config.headers["Authorization"] = `Bearer ${token}`;
			} else {
				delete config.headers["Authorization"];
			}
		} else {
			if (token.length > 0) {
				config.headers = {
					Authorization: `Bearer ${token}` as AxiosHeaderValue,
				} as AxiosRequestHeaders;
			} else {
				delete config.headers["Authorization"];
			}
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

const resetAxiosInstance = () => {
	apiInstance.interceptors.request.clear();
	apiInstance.interceptors.response.clear();

	apiInstance.defaults.headers.common = {
		"Content-Type": "application/json, text/plain, */*",
	};
};

const api = apiInstance;

export {
	api,
	setupAxiosInterceptorsRequestApi,
	setupAxiosInterceptorsResponseApi,
	resetAxiosInstance,
};
