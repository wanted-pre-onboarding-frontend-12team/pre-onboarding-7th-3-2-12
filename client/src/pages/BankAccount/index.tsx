import { AccountGrid, DropDown, Layout, SearchInput } from '@src/components';
import { getAccountList } from '../../apis/bankAccount';
import { useEffect, useState } from 'react';

const BankAccount = () => {
	const [accountList, setAccountList] = useState([]);

	useEffect(() => {
		getAccountList().then((res) => {
			setAccountList(res);
		});
	}, []);

	const handleSearchByKeyword = (keyword: string) => {
		
	};

	return (
		<Layout>
			<main className="p-8">
				<div className="flex justify-between ">
					<div>
						<DropDown options={BROKER} />
						<DropDown options={ACTIVATION} />
						<DropDown options={STATUS} />
					</div>
					<SearchInput onSearchByKeyword={handleSearchByKeyword} />
				</div>
				<AccountGrid accountList={accountList} />
			</main>
		</Layout>
	);
};

export default BankAccount;

const BROKER = [
	{ value: '000', renderText: '브로커명' },
	{ value: '209', renderText: '유안타증권' },
	{ value: '218', renderText: '현대증권' },
	{ value: '230', renderText: '미래에셋증권' },
	{ value: '238', renderText: '대우증권' },
	{ value: '240', renderText: '삼성증권' },
	{ value: '243', renderText: '한국투자증권' },
	{ value: '247', renderText: '우리투자증권' },
	{ value: '261', renderText: '교보증권' },
	{ value: '262', renderText: '하이투자증권' },
	{ value: '263', renderText: 'HMC투자증권' },
	{ value: '264', renderText: '키움증권' },
	{ value: '265', renderText: '이베스트투자증권' },
	{ value: '266', renderText: 'SK증권' },
	{ value: '267', renderText: '대신증권' },
	{ value: '268', renderText: '아이엠투자증권' },
	{ value: '269', renderText: '한화투자증권' },
	{ value: '270', renderText: '하나대투자증권' },
	{ value: '279', renderText: '동부증권' },
	{ value: '280', renderText: '유진투자증권' },
	{ value: '288', renderText: '카카오페이증권' },
	{ value: '287', renderText: '메리츠종합금융증권' },
	{ value: '290', renderText: '부국증권' },
	{ value: '291', renderText: '신영증권' },
	{ value: '292', renderText: 'LIG투자증권' },
	{ value: '271', renderText: '토스증권' },
];

const ACTIVATION = [
	{ value: 0, renderText: '계좌활성화' },
	{ value: 'true', renderText: '활성화' },
	{ value: 'false', renderText: '비활성화' },
];
const STATUS = [
	{ value: 0, renderText: '계좌상태' },
	{ value: 9999, renderText: '관리자확인필요' },
	{ value: 1, renderText: '입금대기' },
	{ value: 2, renderText: '운용중' },
	{ value: 3, renderText: '투자중지' },
	{ value: 4, renderText: '해지' },
];
