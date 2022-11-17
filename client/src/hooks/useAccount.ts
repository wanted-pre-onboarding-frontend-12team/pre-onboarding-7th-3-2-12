import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AccountResponseDTO } from '@src/types/api';
import { getAccounts, getAllAccounts } from '@src/core/apis/account';

type Props = {
	accountBroker: string;
	accountStatus: string;
	accountActive: string;
};

const useAccount = (currentPage: number, search: string, accountFilterObj: Props) => {
	const { data: accounts } = useQuery<AccountResponseDTO[]>(['getAccounts', currentPage, accountFilterObj, search], () =>
		getAccounts(currentPage, search, accountFilterObj),
	);

	const { data: allAccounts } = useQuery<AccountResponseDTO[]>(['getAllAccounts', search, accountFilterObj], () =>
		getAllAccounts(search, accountFilterObj),
	);

	const totalPage = useMemo(() => allAccounts && Math.ceil(allAccounts.length / 14), [allAccounts]);

	return { accounts, totalPage };
};

export default useAccount;
