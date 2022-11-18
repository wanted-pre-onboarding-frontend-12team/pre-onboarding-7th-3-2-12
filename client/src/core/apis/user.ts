import { API_PATH, httpMehthod } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { UserObject, UserResponseDTO, UserSettingResponseDTO } from '@src/types/api';

export const getUserAll = async (query: string | null) => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${users}${query}`,
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

export const getUser = async (uuid: string) => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.GET,
		url: users,
		params: { uuid: uuid },
	});

	return payload;
};

export const getUserSetting = async (uuid: string) => {
	const {
		user: { setting },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserSettingResponseDTO[]>({
		method: httpMehthod.GET,
		url: setting,
		params: { uuid: uuid },
	});
	return payload;
};

type userInfo = {};
type UserResponse = {
	accessToken: string;
	user: UserObject;
};

export const getUserSettingAll = async (query: string | null) => {
	const {
		user: { setting },
	} = API_PATH;

	const { payload } = await requester<UserSettingResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${setting}${query}`,
	});

	return payload;
};

export const onAddUser = async ({ ...props }: userInfo) => {
	const {
		user: { users },
	} = API_PATH;
	const data = { ...props };
	const { headers, status, payload } = await requester<UserResponse>({
		method: httpMehthod.POST,
		url: users,
		data,
	});
	return payload;
};

type userSetting = {};

export const onAddSetting = async ({ ...props }: userSetting) => {
	const {
		user: { setting },
	} = API_PATH;
	const data = { ...props };
	const { headers, status, payload } = await requester<UserSettingResponseDTO[]>({
		method: httpMehthod.POST,
		url: setting,
		data,
	});
	return payload;
};

type Props = {
	id: number;
	name: string;
};

export const updateUserName = async ({ id, name }: Props) => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.PATCH,
		url: `${users}/${id}`,
		data: { name },
	});
	return payload;
};

export const updateAccountName = async ({ id, name }: Props) => {
	const {
		user: { users },
	} = API_PATH;

	const { headers, status, payload } = await requester<UserResponseDTO[]>({
		method: httpMehthod.PATCH,
		url: `${users}/${id}`,
		data: { name },
	});
	return payload;
};
