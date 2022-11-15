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

	return (
		<Layout>
			<main className="p-8">
				<div className="flex justify-between ">
					<div>
						<DropDown list={BROKER} />
						<DropDown list={ACTIVATION} />
						<DropDown list={STATUS} />
					</div>
					<SearchInput />
				</div>
				<AccountGrid accountList={accountList} />
			</main>
		</Layout>
	);
};

export default BankAccount;

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
