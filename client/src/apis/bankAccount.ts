import { requester } from './requester';

export const getAccountList = async () => {
	const response = await requester({
		method: 'GET',
		url: '/accounts',
	});
	return response.data;
};
