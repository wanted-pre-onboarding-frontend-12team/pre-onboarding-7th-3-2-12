import { API_PATH, httpMehthod } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { SignInResponseDTO } from '@src/types/api';

export const signin = async (email: string, password: string) => {
	const {
		auth: { login },
	} = API_PATH;

	const { headers, status, payload } = await requester<SignInResponseDTO>({
		method: httpMehthod.POST,
		url: `${login}`,
		data: {
			email,
			password,
		},
	});

	return payload;
};
