import { useEffect, useState } from 'react';
import { useParams, Params, Link } from 'react-router-dom';
import { Layout } from '@src/components';
import useAccountDetail from '@src/hooks/useAccountDetail';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { maskingAccount } from '@src/utils/accountUtils';
import { numberWithCommasConverter } from '@src/utils/numberUtils';
import { getDay } from '@src/utils/dayUtils';
import { accountStatusTable } from '@src/constants/account';

const AccountDetail = () => {
	const { id } = useParams<Params>();
	const { accountDetail } = useAccountDetail(Number(id));
	const [isGain, setIsGain] = useState('gray');

	useEffect(() => {
		if (accountDetail && accountDetail[0].assets > accountDetail![0].payments) {
			setIsGain('#9F0A1B');
		} else if (accountDetail && accountDetail[0].assets < accountDetail![0].payments) setIsGain('#0C69E6');
	}, [accountDetail]);

	return (
		<Layout>
			{accountDetail && (
				<>
					<div className="grid grid-cols-2 w-full h-full ">
						<div className="m-8">
							{accountDetail[0].is_active ? (
								<div className="inline-block bg-green-500 text-white rounded-lg">
									<p className="p-1">활성화된 계좌</p>
								</div>
							) : (
								<div className=" bg-red-500  inline-block text-white rounded-lg">
									<p className="p-1">비활성화된 계좌</p>
								</div>
							)}
							<Link
								to={`/users/${accountDetail[0].user_uuid}/${accountDetail[0].user_id}`}
								className="block pt-6 font-bold text-3xl underline underline-offset-4"
							>
								{accountDetail[0].user_name} 님의 계좌
							</Link>
							<div className="rounded-2xl p-10 mt-14 bg-white">
								<p className="inline-block mr-2 text-xl ">{accountStatusTable.BrokerTable[accountDetail[0].broker_id]}</p>
								<p className="inline-block text-xl">{maskingAccount(accountDetail[0].number)}</p>
								<p className="pt-7 text-xl font-bold">{accountStatusTable.AccountNameTable[accountDetail[0].name]}</p>
								<p className="pt-2 font-bold  text-4xl"> {numberWithCommasConverter(accountDetail[0].assets)} 원 </p>
								<div className="border mt-3 mb-6" />
								<p className="text-xl text-gray-500"> 개설일: {getDay(accountDetail[0].created_at)} </p>
								<p className="text-xl text-gray-500"> 계좌상태: {accountStatusTable.SatusTable[accountDetail[0].status]} </p>
							</div>
						</div>
						<div className="m-10">
							<div className="inline-block pr-12 pt-10 pb-5 rounded-2xl bg-white">
								<div className="inline-block pl-16">
									<p className="font-bold text-lg">입금금액(payment)</p>
									<p className="text-xl">{numberWithCommasConverter(accountDetail[0].payments)}원</p>
								</div>
								<div className="inline-block pl-10">
									<p className="font-bold text-lg">평가금액(assets)</p>
									<p className="text-xl">{numberWithCommasConverter(accountDetail[0].assets)}원</p>
								</div>

								<BarChart
									width={400}
									height={300}
									className="mt-4"
									data={accountDetail}
									margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
								>
									<XAxis dataKey="계좌현황" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey="payments" fill="gray" barSize={70} />
									<Bar dataKey="assets" fill={isGain} barSize={70} />
								</BarChart>
							</div>
						</div>
					</div>
				</>
			)}
		</Layout>
	);
};

export default AccountDetail;
