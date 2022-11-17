import { useQuery } from '@tanstack/react-query';
import { UserResponseDTO, UserSettingResponseDTO } from '@src/types/api';
import { getUser, getUserSetting } from '@src/core/apis/user';

const useUserInfo = (uuid: string) => {
	const { data: userData } = useQuery<UserResponseDTO[]>(['getUser'], async () => getUser(uuid as string));
	const { data: userSettingData } = useQuery<UserSettingResponseDTO[]>(['getUserSetting', uuid], async () =>
		getUserSetting(uuid as string),
	);
	const userInfoData = userSettingData && userData && Object.assign({}, ...userSettingData, ...userData);
	return { userInfoData };
};

export default useUserInfo;
Co-authored-by: OD <kg-te@naver.com>