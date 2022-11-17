import { getUserSetting } from '@src/core/apis/user';
import { UserSettingResponseDTO } from '@src/types/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useUserSetting = (uuid: string) => {
	const { data: userSettingData } = useQuery<UserSettingResponseDTO[]>(['getUserSetting', uuid], async () =>
		getUserSetting(uuid as string),
	);
	return { userSettingData };
};

export default useUserSetting;
