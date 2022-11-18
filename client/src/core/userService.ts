import { getAllAccounts } from '@src/core/apis/account';
import { getUserSettingAll } from '@src/core/apis/user';
import { FullInfoUser, UserResponseDTO, UserSettingResponseDTO } from '@src/types/api';
import { generateQueryString } from '@src/utils/stringUtils';

type UserSettingFilterObj = {
	is_active_like: string;
	is_staff_like: string;
};

export const generateFullInfoUsers = async (users: UserResponseDTO[], userSettingFilterObj: UserSettingFilterObj) => {
	const userSettings = await getUserSettingAll(generateQueryString(userSettingFilterObj));
	const accounts = await getAllAccounts('', {
		accountBroker: '',
		accountStatus: '',
		accountActive: '',
	});

	const fullInfoUsers: FullInfoUser[] = [];

	for (let i = 0; i < users.length; i++) {
		const targetUserAccountCount = accounts.filter((account) => users[i].id === account.user_id).length;
		const targetUserUserSetting: UserSettingResponseDTO = userSettings.filter(
			(userSetting) => users[i].uuid === userSetting.uuid,
		)[0];

		if (targetUserUserSetting) {
			fullInfoUsers.push({
				...users[i],
				is_active: targetUserUserSetting?.is_active ?? false,
				is_staff: targetUserUserSetting?.is_staff ?? false,
				allow_marketing_push: targetUserUserSetting?.allow_marketing_push ?? false,
				account_count: targetUserAccountCount,
			});
		}
	}

	return fullInfoUsers;
};
