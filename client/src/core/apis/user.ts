import { API_PATH, httpMehthod } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { UserResponseDTO } from '@src/types/api';

export const getUsers = async () => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${users}`,
	});

	return payload;
};
