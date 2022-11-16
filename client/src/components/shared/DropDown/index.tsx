import useAccountStore from '@src/zustand/useAccountStore';
import { Zus_Broker_id, Zus_Active, Zus_Status } from '@src/constants/zustand';

const DropDown = ({ list, type }: any) => {
	const store = useAccountStore((state) => state);

	const filterType = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
		if (type === 'broker') {
			store.setBroker(e.currentTarget.value as Zus_Broker_id);
		} else if (type === 'status') {
			store.setStatus(e.currentTarget.value as Zus_Status);
		} else if (type === 'active') {
			store.setActive(e.currentTarget.value as Zus_Active);
		}
		//TODO: 여기다가 currentPage 1로 초기화 하는 로직을 넣으면 되지 않을까 싶다.
	};

	return (
		<select className="w-36 h-10 px-3 mx-2 border-solid border rounded outline-none" onChange={(e) => filterType(e, type)}>
			{list &&
				list.map((item: any, index: number) => {
					return (
						<option key={index} value={Object.keys(item)}>
							{Object.values(item)}
						</option>
					);
				})}
		</select>
	);
};

export default DropDown;
