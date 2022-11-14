import { requester } from './requester';

export const onLogin = async (email: string, password: string) => {
	const data = { email, password };
	try {
		const response = await requester({
			method: 'POST',
			url: '/login',
			data,
		});
		return response.data;
	} catch (err: any) {
		throw new Error(err);
	}
};
