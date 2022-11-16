import { useState } from 'react';
import { AccountGrid, DropDown, Layout, SearchInput } from '@src/components';
import useAccount from '@src/hooks/useAccount';
import Pagenation from '@src/components/shared/Pagenation';
import { dropDownTable } from '@src/constants/dropDown';
import useAccountStore from '@src/zustand/useAccountStore';

const Account = () => {
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const store = useAccountStore((state) => state);
	const selectedBroker = store.broker;
	const selectedActive = store.active;
	const selectedStatus = store.status;
	const { accounts, totalPage } = useAccount(currentPage, selectedBroker, selectedActive, selectedStatus, search);

	const handlePagenationChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return (
		<Layout>
			<main className="p-8">
				<div className="flex justify-between">
					<div>
						<DropDown type="broker" list={dropDownTable.BrokerDropDown} />
						<DropDown type="status" list={dropDownTable.SatusDropDown} />
						<DropDown type="active" list={dropDownTable.ActiveDropDown} />
					</div>
					<SearchInput setSearch={setSearch} />
				</div>
				<AccountGrid accountList={accounts} />
				<Pagenation totalPage={totalPage!} currentPage={currentPage} onPagenationChange={handlePagenationChange} />
			</main>
		</Layout>
	);
};

export default Account;
