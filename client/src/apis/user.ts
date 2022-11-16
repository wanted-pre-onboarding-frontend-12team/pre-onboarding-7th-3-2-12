import { requester } from './requester';

type userInfo = {};

export const onAddUser = async ({ ...props }: userInfo) => {
	const data = { ...props };
	try {
		const response = await requester({
			method: 'POST',
			url: '/users',
			data,
		});
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
};

type userSetting = {};

export const onAddSetting = async ({ ...props }: userSetting) => {
	const data = { ...props };
	try {
		const response = await requester({
			method: 'POST',
			url: '/userSetting',
			data,
		});
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
};
