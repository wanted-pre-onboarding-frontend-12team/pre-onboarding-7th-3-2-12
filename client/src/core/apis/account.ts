import { httpMehthod, API_PATH } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { AccountResponseDTO } from '@src/types/api';

type Props = {
	accountBroker: string;
	accountStatus: string;
	accountActive: string;
};

export const getAccounts = async (currentPage: number, search: string, accountFilterObj: Props) => {
	const {
		user: { accounts },
	} = API_PATH;

	const { headers, status, payload } = await requester<AccountResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${accounts}?_page=${currentPage}&q=${search}&_limit=14&broker_id_like=${accountFilterObj.accountBroker}&status_like=${accountFilterObj.accountStatus}&is_active_like=${accountFilterObj.accountActive}`,
	});
	return payload;
};

export const getAllAccounts = async (search: string, accountFilterObj: Props) => {
	const {
		user: { accounts },
	} = API_PATH;

	const { headers, status, payload } = await requester<AccountResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${accounts}?&q=${search}&broker_id_like=${accountFilterObj.accountBroker}&status_like=${accountFilterObj.accountStatus}&is_active_like=${accountFilterObj.accountActive}`,
	});

	return payload;
};

export const getAccountDetail = async (id: number) => {
	const {
		user: { accounts },
	} = API_PATH;

	const { headers, status, payload } = await requester<AccountResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${accounts}`,
		params: {
			id: id,
		},
	});

	return payload;
};

export const getUserAccounts = async (user_id: number) => {
	const {
		user: { accounts },
	} = API_PATH;

	const { headers, status, payload } = await requester<AccountResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${accounts}?user_id=${user_id}`,
	});

	return payload;
};
