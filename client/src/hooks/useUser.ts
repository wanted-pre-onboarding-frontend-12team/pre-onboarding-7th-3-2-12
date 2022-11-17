import { useQuery } from '@tanstack/react-query';
import { UserResponseDTO } from '@src/types/api';
import { getUser } from '@src/core/apis/user';

const useUser = (uuid: string) => {
	const { data: userData } = useQuery<UserResponseDTO[]>(['getUser'], async () => getUser(uuid as string));
	return { userData };
};

export default useUser;
