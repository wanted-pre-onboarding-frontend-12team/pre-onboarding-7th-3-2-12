import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const createAxiosInstance = () => {
	const base = axios.create({
		baseURL: import.meta.env.VITE_BASE_API_URL,
	});

	return base;
};

const axiosInstance = createAxiosInstance();

export async function requester<Payload>(option: AxiosRequestConfig) {
	const ACCESS_TOKEN = localStorage.getItem('');
	const response: AxiosResponse<Payload> = await axiosInstance(
		ACCESS_TOKEN
			? {
					headers: {
						Authorization: `Bearer ${ACCESS_TOKEN}`,
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
		data: response.data,
	};
}
