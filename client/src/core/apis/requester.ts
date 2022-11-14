import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getLocalStorage } from '@src/utils/storage';
import { ACCESS_TOKEN_KEY } from '@src/core/apis/common';

const createAxiosInstance = () => {
	const base = axios.create({
		baseURL: import.meta.env.VITE_BASE_API_URL,
	});

	return base;
};

const axiosInstance = createAxiosInstance();

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
