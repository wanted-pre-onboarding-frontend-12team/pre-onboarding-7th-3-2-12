import { Status, Broker_id, AccountName } from '@src/types/api';

const BrokerTable: Record<Broker_id, string> = {
	209: '유안타증권',
	218: '현대증권',
	230: '미래에셋증권',
	238: '대우증권',
	240: '삼성증권',
	243: '한국투자증권',
	247: '우리투자증권',
	261: '교보증권',
	262: '하이투자증권',
	263: 'HMC투자증권',
	264: '키움증권',
	265: '이베스트투자증권',
	266: 'SK증권',
	267: '대신증권',
	268: '아이엠투자증권',
	269: '한화투자증권',
	270: '하나대투자증권',
	271: '토스증권',
	279: '동부증권',
	280: '유진투자증권',
	288: '카카오페이증권',
	287: '메리츠종합금융증권',
	290: '부국증권',
	291: '신영증권',
	292: 'LIG투자증권',
};

const SatusTable: Record<Status, string> = {
	9999: '관리자확인필요',
	1: '입금대기',
	2: '운용중',
	3: '투자중지',
	4: '해지',
};

const AccountNameTable: Record<AccountName, string> = {
	'Home Loan Account': '주택 대출 계좌',
	'Auto Loan Account': '자동 대출 계좌',
	'Checking Account': '당좌 예금 계좌',
	'Credit Card Account': '신용 카드 계좌',
	'Personal Loan Account': '개인 대출 계좌',
	'Investment Account': '투자 계좌',
	'Savings Account': '예금 계좌',
	'Money Market Account': '머니 마켓 계좌',
};

export const accountStatusTable = { BrokerTable, SatusTable, AccountNameTable };

export const ACCOUNT_LIST = [
	'고객명',
	'브로커명',
	'계좌번호',
	'계좌상태',
	'계좌명',
	'평가금액',
	'입금금액 ',
	'계좌활성화여부',
	'계좌개설일',
];

const BROKER = [
	'브로커명',
	'유안타증권',
	'현대증권',
	'미래에셋증권',
	'대우증권',
	'삼성증권',
	'한국투자증권',
	'우리투자증권',
	'교보증권',
	'하이투자증권',
	'HMC투자증권',
	'키움증권',
	'이베스트투자증권',
	'SK증권',
	'대신증권',
	'아이엠투자증권',
	'한화투자증권',
	'하나대투자증권',
	'동부증권',
	'유진투자증권',
	'카카오페이증권',
	'메리츠종합금융증권',
	'부국증권',
	'신영증권',
	'LIG투자증권',
	'토스증권',
];
const ACTIVATION = ['계좌활성화', '활성화', '비활성화'];

const STATUS = ['계좌상태', '관리자확인필요', '입금대기', '운용중', '투자중지', '해지'];

export const accountFilterTable = { BROKER, ACTIVATION, STATUS };
