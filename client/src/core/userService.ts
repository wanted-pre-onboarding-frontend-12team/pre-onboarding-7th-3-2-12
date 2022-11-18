import { deleteAccountById, getAllAccounts } from '@src/core/apis/account';
import { deleteUserById, deleteUserSettingById, getUserSettingAll } from '@src/core/apis/user';
import { FullInfoUser, UserResponseDTO, UserSettingResponseDTO } from '@src/types/api';
import { generateQueryString } from '@src/utils/stringUtils';
import { AxiosError } from 'axios';

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
		const targetUserAccounts = accounts.filter((account) => users[i].id === account.user_id);
		const targetUserUserSetting: UserSettingResponseDTO = userSettings.filter(
			(userSetting) => users[i].uuid === userSetting.uuid,
		)[0];

		if (targetUserUserSetting) {
			fullInfoUsers.push({
				...users[i],
				is_active: targetUserUserSetting?.is_active ?? false,
				is_staff: targetUserUserSetting?.is_staff ?? false,
				allow_marketing_push: targetUserUserSetting?.allow_marketing_push ?? false,
				account_count: targetUserAccounts.length,
				user_accounts: targetUserAccounts,
				user_setting_id: targetUserUserSetting.id,
			});
		}
	}

	return fullInfoUsers;
};

export const deleteUserInfo = async (targetUser: FullInfoUser) => {
	try {
		targetUser.user_accounts.forEach(async (account) => {
			await deleteAccountById(account.id);
		});

		await deleteUserSettingById(targetUser.user_setting_id);
		await deleteUserById(targetUser.id);
	} catch (error) {
		if (error instanceof AxiosError) {
			console.error(`${targetUser.name} 고객 삭제 중 오류 발생 !`);
		}
	}
};
