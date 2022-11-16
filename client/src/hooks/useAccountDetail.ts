import { useQuery } from '@tanstack/react-query';
import { getAccountDetail } from '@src/core/apis/account';
import { AccountResponseDTO } from '@src/types/api';

const useAccountDetail = (id: number) => {
	const { data: accountDetail } = useQuery<AccountResponseDTO[]>(['getAccountDetail', id], () => getAccountDetail(id));

	return { accountDetail };
};

export default useAccountDetail;
