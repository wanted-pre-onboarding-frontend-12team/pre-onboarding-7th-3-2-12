import { Link } from 'react-router-dom';
import { accountStatusTable } from '@src/constants/account';
import { AccountResponseDTO } from '@src/types/api';
import { ACCOUNT_LIST } from '@src/constants/account';
import { numberWithCommasConverter } from '@src/utils/numberUtils';
import { getDay } from '@src/utils/dayUtils';
import { maskingAccount } from '@src/utils/accountUtils';

const AccountGrid = ({ accountList }: { accountList: AccountResponseDTO[] | undefined }) => {
	return (
		<article className="mt-12 overflow-x-auto">
			<ul className="grid grid-cols-[minmax(90px,_1fr)_minmax(100px,_1fr)_minmax(150px,_1.5fr)_minmax(100px,_1fr)_minmax(150px,_1fr)_1.5fr_1.5fr_minmax(140px,_1fr)_minmax(120px,_1fr)]">
				{ACCOUNT_LIST.map((item: string) => {
					return <li className="py-2 px-5 border border-solid border-gray-300 bg-[#FAFAFA] text-center">{item}</li>;
				})}
				{accountList?.map((item: AccountResponseDTO) => {
					const isGain =
						item.assets > item.payments ? 'text-red-800' : item.assets < item.payments ? 'text-blue-800' : 'text-black';

					return (
						<>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								<Link to={`/accounts/${item.id}`} className="border-b-2 border-black hover:text-blue-500 hover:border-blue-500">
									{item.user_id}
								</Link>
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								{accountStatusTable.BrokerTable[item.broker_id]}
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								{maskingAccount(item.number)}
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								{accountStatusTable.SatusTable[item.status]}
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								{accountStatusTable.AccountNameTable[item.name]}
							</li>
							<li className={`py-2 px-4 border border-solid border-gray-300 bg-white text-center ${isGain}`}>
								{numberWithCommasConverter(item.assets)}
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								{numberWithCommasConverter(item.payments)}
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>
								{item.is_active ? '활성화' : '비활성화'}
							</li>
							<li className={'py-2 px-4 border border-solid border-gray-300 bg-white text-center'}>{getDay(item.created_at)}</li>
						</>
					);
				})}
			</ul>
		</article>
	);
};

export default AccountGrid;
