import { useQuery } from '@tanstack/react-query';
import { AccountResponseDTO } from '@src/types/api';
import { getUserAccounts } from '@src/core/apis/account';

const useUserAccounts = (user_id: number) => {
	const { data: userAccounts } = useQuery<AccountResponseDTO[]>(['getUserAccounts', user_id], () => getUserAccounts(user_id));

	return { userAccounts };
};

export default useUserAccounts;
