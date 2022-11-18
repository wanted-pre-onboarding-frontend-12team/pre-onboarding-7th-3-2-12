import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DropDown, Layout, Pagenation, SearchInput, UserGridTable } from '@src/components';
import { getUserAll } from '@src/core/apis/user';
import { generateFullInfoUsers } from '@src/core/userService';
import { FullInfoUser, UserResponseDTO } from '@src/types/api';
import { generateQueryString } from '@src/utils/stringUtils';

const tableHeadTrs = [
	'고객명',
	'성별(코드)',
	'생년월일',
	'이메일주소',
	'휴대폰번호',
	'혜택 수신동의 여부',
	'활성화 여부',
	'가입일',
	'보유 계좌수',
	'최근로그인 날짜',
	'',
];

const isStaffOptions = [
	{
		id: 1,
		value: '',
		renderText: '임직원 계좌 여부',
	},
	{
		id: 2,
		value: 'true',
		renderText: '임직원 계좌 O',
	},
	{
		id: 3,
		value: 'false',
		renderText: '임직원 계좌 X',
	},
];

const isActiveOptions = [
	{
		id: 1,
		value: '',
		renderText: '활성화 여부',
	},
	{
		id: 2,
		value: 'true',
		renderText: '활성화 O',
	},
	{
		id: 3,
		value: 'false',
		renderText: '활성화 X',
	},
];

const PAGE_OFFSET = 20;
const DEFALUT_PAGE = 1;

const Users = () => {
	const [fullInfoUsers, setFullInfoUsers] = useState<FullInfoUser[]>();
	const [searchKeyword, setSearchKeyword] = useState('');
	const [currentPage, setCurrentPage] = useState(DEFALUT_PAGE);
	const [userSettingFilter, setUserSettingFilter] = useState({
		is_active_like: '',
		is_staff_like: '',
	});

	const { data: users } = useQuery<UserResponseDTO[]>(
		['getUserAll', searchKeyword, userSettingFilter],
		async () => getUserAll(generateQueryString({ q: searchKeyword })) || null,
		{
			onSuccess: async (data) => {
				const newFullInfoUsers = await generateFullInfoUsers(data, userSettingFilter);
				setFullInfoUsers(newFullInfoUsers);
			},
		},
	);

	const handlePagenationChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSearchByKeyword = (keyword: string) => {
		setSearchKeyword(keyword);
	};

	const handleUserSettingFilterChange = (value: string, changeTarget: string) => {
		setUserSettingFilter({ ...userSettingFilter, [changeTarget]: value });
	};

	return (
		<Layout>
			<div className="flex justify-between h-10 mb-4">
				<div className="flex items-center">
					<Link
						to="/users/post-user"
						className="flex items-center h-full rounded bg-[#041527] text-white font-bold px-4 opacity-80 hover:opacity-100"
					>
						고객 생성
					</Link>
				</div>
				<div className="flex items-center">
					<DropDown dropdownTarget="is_active_like" options={isActiveOptions} onDropdownChange={handleUserSettingFilterChange} />
					<DropDown dropdownTarget="is_staff_like" options={isStaffOptions} onDropdownChange={handleUserSettingFilterChange} />
					<SearchInput onSearchByKeyword={handleSearchByKeyword} />
				</div>
			</div>

			<UserGridTable
				tableHeadTrs={tableHeadTrs}
				tableBodyList={fullInfoUsers?.slice((currentPage - 1) * PAGE_OFFSET, currentPage * PAGE_OFFSET)}
			/>
			<Pagenation
				searchKeyword={searchKeyword}
				setCurrentPage={setCurrentPage}
				filterObj={userSettingFilter}
				currentPage={currentPage}
				totalPage={(fullInfoUsers && Math.ceil(fullInfoUsers.length / PAGE_OFFSET)) ?? DEFALUT_PAGE}
				onPagenationChange={handlePagenationChange}
			/>
		</Layout>
	);
};

export default Users;
