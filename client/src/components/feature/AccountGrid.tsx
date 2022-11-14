const AccountGrid = ({ accountList }: any) => {
	return (
		<article className="overflow-x-auto mt-12">
			<ul className="grid grid-cols-[minmax(90px,_1fr)_minmax(100px,_1fr)_minmax(150px,_1.5fr)_minmax(100px,_1fr)_minmax(150px,_1fr)_1.5fr_1.5fr_minmax(140px,_1fr)_minmax(120px,_1fr)]">
				{ACCOUNT_LIST.map((item: string) => {
					return <li className="py-2 px-5 border border-solid border-gray-300 bg-[#FAFAFA] text-center">{item}</li>;
				})}
				{accountList.map((item: any) => {
					return (
						<>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.user_id}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.broker_id}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.number}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.status}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.name}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.assets}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.payments}</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">
								{item.is_active ? '활성화' : '비활성화'}
							</li>
							<li className="py-2 px-4 border border-solid border-gray-300 bg-white text-center">{item.created_at}</li>
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
const ACCOUNT = [
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
	{
		user_id: '홍길동',
		broker_id: '토스증권',
		number: '1234567891011',
		status: '해지',
		name: 'saving account',
		assets: 50000000,
		payments: 7000000000,
		is_active: '활성화',
		created_at: '2019-11-12',
	},
];
