const AccountGrid = ({ accountList }: any) => {
	return (
		<article className="mt-12 overflow-x-auto">
			<ul className="grid grid-cols-[minmax(90px,_1fr)_minmax(100px,_1fr)_minmax(150px,_1.5fr)_minmax(100px,_1fr)_minmax(150px,_1fr)_1.5fr_1.5fr_minmax(140px,_1fr)_minmax(120px,_1fr)]">
				{ACCOUNT_LIST.map((item: string) => {
					return <li className="py-2 px-5 border border-solid border-gray-300 bg-[#FAFAFA] text-center">{item}</li>;
				})}
				{accountList.map((item: any) => {
					return (
						<>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.user_id}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.broker_id}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.number}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.status}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.name}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.assets}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.payments}</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{item.is_active ? '활성화' : '비활성화'}
							</li>
							<li className="px-4 py-2 text-center bg-white border border-gray-300 border-solid">{item.created_at}</li>
						</>
					);
				})}
			</ul>
		</article>
	);
};

export default AccountGrid;

const ACCOUNT_LIST = [
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
