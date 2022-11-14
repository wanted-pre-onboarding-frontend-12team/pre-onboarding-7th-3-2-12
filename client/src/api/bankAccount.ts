import { Requester } from '../api/requester';

export const getAccountList = async () => {
	const status = await Requester.get(`/accounts`)
		.then((res) => res.data)
		.catch((err) => err.response.data);
	return status;
};
