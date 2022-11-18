const AccountBrokerIdOptions = [
	{ id: 1, value: '', renderText: '브로커명' },
	{ id: 2, value: '209', renderText: '유안타증권' },
	{ id: 3, value: '218', renderText: '현대증권' },
	{ id: 4, value: '230', renderText: '미래에셋증권' },
	{ id: 5, value: '238', renderText: '대우증권' },
	{ id: 6, value: '240', renderText: '삼성증권' },
	{ id: 7, value: '243', renderText: '한국투자증권' },
	{ id: 8, value: '247', renderText: '우리투자증권' },
	{ id: 9, value: '261', renderText: '교보증권' },
	{ id: 10, value: '262', renderText: '하이투자증권' },
	{ id: 11, value: '263', renderText: 'HMC투자증권' },
	{ id: 12, value: '264', renderText: '키움증권' },
	{ id: 13, value: '265', renderText: '이베스트투자증권' },
	{ id: 14, value: '266', renderText: 'SK증권' },
	{ id: 15, value: '267', renderText: '대신증권' },
	{ id: 16, value: '268', renderText: '아이엠투자증권' },
	{ id: 17, value: '269', renderText: '한화투자증권' },
	{ id: 18, value: '270', renderText: '하나대투자증권' },
	{ id: 19, value: '279', renderText: '동부증권' },
	{ id: 20, value: '280', renderText: '유진투자증권' },
	{ id: 21, value: '288', renderText: '카카오페이증권' },
	{ id: 22, value: '287', renderText: '메리츠종합금융증권' },
	{ id: 23, value: '290', renderText: '부국증권' },
	{ id: 24, value: '291', renderText: '신영증권' },
	{ id: 25, value: '292', renderText: 'LIG투자증권' },
	{ id: 26, value: '271', renderText: '토스증권' },
];

const AccountStatusOptions = [
	{ id: 1, value: '', renderText: '계좌상태' },
	{ id: 6, value: '9999', renderText: '관리자확인필요' },
	{ id: 3, value: '1', renderText: '입금대기' },
	{ id: 4, value: '2', renderText: '운용중' },
	{ id: 5, value: '3', renderText: '투자중지' },
	{ id: 7, value: '4', renderText: '해지' },
];

const AccountActiveOptions = [
	{ id: 1, value: '', renderText: '계좌활성화' },
	{ id: 2, value: 'true', renderText: '활성화' },
	{ id: 3, value: 'false', renderText: '비활성화' },
];

export const dropDownTable = { AccountBrokerIdOptions, AccountStatusOptions, AccountActiveOptions };
