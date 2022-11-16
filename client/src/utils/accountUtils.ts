export const maskingAccount = (account_number: string) => {
	const middleMask = account_number.substring(2, account_number.length - 2);
	// 마스킹 변수 선언(*)
	let masking = '';

	// 앞 2자리, 맨뒤 2자리를 빼고 모두 마스킹 하기위한 증감값
	for (let i = 0; i < middleMask.length; i++) {
		masking += '*';
	}

	return account_number.replace(middleMask, masking);
};
