import { httpMehthod, API_PATH } from '@src/core/apis/common';
import requester from '@src/core/apis/requester';
import { AccountResponseDTO } from '@src/types/api';

export const getAccouts = async (
	currentPage: number,
	selectedBroker: string,
	selectedActive: string,
	selectedStatus: string,
	search: string,
) => {
	const {
		user: { accounts },
	} = API_PATH;

	const { headers, status, payload } = await requester<AccountResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${accounts}?_page=${currentPage}&_limit=14&broker_id_like=${selectedBroker}&status_like=${selectedStatus}&is_active_like=${selectedActive}&q=${search}`,
	});

	return payload;
};

export const getAllAccouts = async (selectedBroker: string, selectedActive: string, selectedStatus: string, search: string) => {
	const {
		user: { accounts },
	} = API_PATH;

	const { headers, status, payload } = await requester<AccountResponseDTO[]>({
		method: httpMehthod.GET,
		url: `${accounts}?q=${search}&broker_id_like=${selectedBroker}&status_like=${selectedStatus}&is_active_like=${selectedActive}`,
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
