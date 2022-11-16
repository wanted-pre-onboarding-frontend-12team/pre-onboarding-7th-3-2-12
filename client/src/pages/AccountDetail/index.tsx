import { useParams, Params } from 'react-router-dom';
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

	return (
		<Layout>
			{accountDetail && (
				<div className="grid grid-cols-2 w-full h-full ">
					<div className="m-10">
						{accountDetail[0].is_active ? (
							<div className="inline-block bg-green-500 text-white rounded-lg">
								<p className="p-1">활성화된 계좌</p>
							</div>
						) : (
							<div className=" bg-red-500  inline-block text-white rounded-lg">
								<p className="p-1">비활성화된 계좌</p>
							</div>
						)}

						<div className="flex flex-col rounded-3xl w-full space-y-10 pl-5 mt-14 bg-white">
							<p className="font-bold text-xl underline underline-offset-2  cursor-pointer"> 김*현 님의 계좌 </p>
							<p className="text-xl cursor-pointer">{accountStatusTable.BrokerTable[accountDetail[0].broker_id]}</p>
							<p className="text-xl cursor-pointer">{maskingAccount(accountDetail[0].number)}</p>
							<p className="font-bold text-4xl"> {numberWithCommasConverter(accountDetail[0].assets)} 원 </p>
							<p className="text-xl text-gray-500"> {getDay(accountDetail[0].created_at)} 개설되었어요! </p>
						</div>
					</div>
					<div className="m-10">
						<div className="my-3">
							<div className="inline-block rounded-lg bg-white mx-4 p-5">
								<p className="p-0.5">입금금액</p>
								<p className="p-0.5">{numberWithCommasConverter(accountDetail[0].payments)}</p>
							</div>
							<div className="inline-block rounded-lg bg-white mx-4 p-5">
								<p className="p-0.5">평가금액</p>
								<p className="p-0.5">{numberWithCommasConverter(accountDetail[0].assets)}</p>
							</div>
						</div>
						<div className="inline-block rounded-3xl mt-11 bg-white">
							<BarChart width={400} height={300}>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="평가금액" fill="#8884d8" />
								<Bar dataKey="입금금액" fill="#82ca9d" />
							</BarChart>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default AccountDetail;
