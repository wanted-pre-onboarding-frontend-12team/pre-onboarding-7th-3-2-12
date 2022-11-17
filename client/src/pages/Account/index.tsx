import { useState } from 'react';
import { AccountGrid, DropDown, Layout, SearchInput } from '@src/components';
import useAccount from '@src/hooks/useAccount';
import Pagenation from '@src/components/shared/Pagenation';
import { dropDownTable } from '@src/constants/dropDown';

const Account = () => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [accountFilterObj, setAccountFilterObj] = useState({
		accountBroker: '',
		accountStatus: '',
		accountActive: '',
	});

	const { accounts, totalPage } = useAccount(currentPage, searchKeyword, accountFilterObj);

	const handlePagenationChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSearchByKeyword = (keyword: string) => {
		setSearchKeyword(keyword);
	};

	const handleDropdownFilterChange = (value: string, changeTarget: string) => {
		setAccountFilterObj({ ...accountFilterObj, [changeTarget]: value });
	};

	return (
		<Layout>
			<main className="p-8">
				<div className="flex justify-between">
					<div>
						<DropDown
							dropdownTarget="accountBroker"
							options={dropDownTable.AccountBrokerIdOptions}
							onDropdownChange={handleDropdownFilterChange}
						/>
						<DropDown
							dropdownTarget="accountStatus"
							options={dropDownTable.AccountStatusOptions}
							onDropdownChange={handleDropdownFilterChange}
						/>
						<DropDown
							dropdownTarget="accountActive"
							options={dropDownTable.AccountActiveOptions}
							onDropdownChange={handleDropdownFilterChange}
						/>
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
