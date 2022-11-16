import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AccountResponseDTO } from '@src/types/api';
import { getAccouts, getAllAccouts } from '@src/core/apis/account';

const useAccount = (
	currentPage: number,
	selectedBroker: string,
	selectedActive: string,
	selectedStatus: string,
	search: string,
) => {
	const { data: accounts } = useQuery<AccountResponseDTO[]>(
		['getAccounts', currentPage, selectedBroker, selectedActive, selectedStatus, search],
		() => getAccouts(currentPage, selectedBroker, selectedActive, selectedStatus, search),
	);

	const { data: allAccounts } = useQuery<AccountResponseDTO[]>(
		['getAllAccounts', selectedBroker, selectedActive, selectedStatus, search],
		() => getAllAccouts(selectedBroker, selectedActive, selectedStatus, search),
	);

	const totalPage = useMemo(() => allAccounts && Math.ceil(allAccounts.length / 14), [allAccounts]);

	return { accounts, totalPage };
};

export default useAccount;
