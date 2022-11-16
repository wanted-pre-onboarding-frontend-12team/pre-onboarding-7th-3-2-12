import { API_PATH, httpMehthod } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { UserResponseDTO } from '@src/types/api';

export const getUsers = async (query: string | null) => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${users}${query ? `?q=${query}` : ''}`,
	});

	return payload;
};

export const getUsersByPagenation = async (page: number = 1, limit: number = 20) => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${users}?_page=${page}&_limit=${limit}`,
	});

	return payload;
};

export const getOneUser = async (uuid: string) => {
	try {
		const response = await requester({
			method: 'GET',
			url: `/users`,
			params: {
				uuid: uuid,
			},
		});
		return response.payload;
	} catch (err: any) {
		throw new Error(err);
	}
};

export const getOneUserSetting = async (uuid: string) => {
	try {
		const response = await requester({
			method: 'GET',
			url: '/userSetting',
			params: {
				uuid: uuid,
			},
		});
		return response.payload;
	} catch (err: any) {
		throw new Error(err);
	}
};
