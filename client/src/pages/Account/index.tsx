import { useState } from 'react';
import { AccountGrid, DropDown, Layout, SearchInput } from '@src/components';
import useAccount from '@src/hooks/useAccount';
import Pagenation from '@src/components/shared/Pagenation';
import { dropDownTable } from '@src/constants/dropDown';
import useAccountStore from '@src/zustand/useAccountStore';

const Account = () => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const store = useAccountStore((state) => state);
	const selectedBroker = store.broker;
	const selectedActive = store.active;
	const selectedStatus = store.status;
	const { accounts, totalPage } = useAccount(currentPage, selectedBroker, selectedActive, selectedStatus, searchKeyword);

	const handlePagenationChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSearchByKeyword = (keyword: string) => {
		setSearchKeyword(keyword);
	};

	return (
		<Layout>
			<main className="p-8">
				<div className="flex justify-between">
					<div>
						<DropDown dropdownTarget="broker" options={dropDownTable.BrokerDropDown} onDropdownChange={() => {}} />
						<DropDown dropdownTarget="status" options={dropDownTable.SatusDropDown} onDropdownChange={() => {}}/>
						<DropDown dropdownTarget="active" options={dropDownTable.ActiveDropDown} onDropdownChange={() => {}}/>
					</div>
					<SearchInput onSearchByKeyword={handleSearchByKeyword} />
				</div>
				<AccountGrid accountList={accounts} />
				<Pagenation totalPage={totalPage!} currentPage={currentPage} onPagenationChange={handlePagenationChange} />
			</main>
		</Layout>
	);
};

export default Account;
