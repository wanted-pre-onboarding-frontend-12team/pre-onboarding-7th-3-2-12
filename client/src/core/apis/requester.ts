import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStorage } from '@src/utils/storage';
import { ACCESS_TOKEN_KEY } from '@src/core/apis/common';

const createAxiosInstance = () => {
	const base = axios.create({
		baseURL: import.meta.env.VITE_BASE_API_URL,
	});

	return base;
};

export const axiosInstance = createAxiosInstance();

export default async function requester<Payload>(option: AxiosRequestConfig) {
	const accessToken = getLocalStorage(ACCESS_TOKEN_KEY);
	const response: AxiosResponse<Payload> = await axiosInstance(
		accessToken
			? {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					...option,
			  }
			: {
					...option,
			  },
	);

	return {
		status: response.status,
		headers: response.headers,
		payload: response.data,
	};
}

axiosInstance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response.status === 401) {
			window.location.replace('/');
		}
		return Promise.reject(error);
	},
);
