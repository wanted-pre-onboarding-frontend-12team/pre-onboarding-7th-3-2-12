import { DropDown, Layout, Pagenation, SearchInput, UserGridTable } from "@src/components"
import { getUsers, getUsersByPagenation } from '@src/core/apis/user';
import { UserResponseDTO } from "@src/types/api";
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
		value: 'true',
		renderText: '임직원 O',
	},
	{
		value: 'false',
		renderText: '임직원 X',
	},

];

const isActiveOptions = [
	{
		value: 'true',
		renderText: '활성화 O',
	},
	{
		value: 'false',
		renderText: '활성화 X',
	},
];

const PAGE_OFFSET = 20;
const DEFALUT_PAGE = 1;

const Users = () => {
	const [currentPage, setCurrentPage] = useState(DEFALUT_PAGE);
	const [searchKeyword, setSearchKeyword] = useState("");
	const { data: users } = useQuery<UserResponseDTO[]>(['getUsers', searchKeyword], async () => getUsers(searchKeyword || null));
  const { data: currentUsers } = useQuery<UserResponseDTO[]>(['getUsersByPagenation', currentPage], async () =>
		getUsersByPagenation(currentPage, PAGE_OFFSET),
	);
	const totalPage = useMemo(() => users && Math.ceil(users.length / PAGE_OFFSET), [users]); 

	const handlePagenationChange = (newPage: number) => {
		setCurrentPage(newPage);
	}

	const handleSearchByKeyword = (keyword: string) => {
		setSearchKeyword(keyword);
	}
	
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
					<DropDown options={isActiveOptions} />
					<DropDown options={isStaffOptions} />
					<SearchInput onSearchByKeyword={handleSearchByKeyword} />
				</div>
			</div>

			<UserGridTable
				tableHeadTrs={tableHeadTrs}
				tableBodyList={searchKeyword ? users : currentUsers}
			/>
			<Pagenation currentPage={currentPage} totalPage={totalPage ?? DEFALUT_PAGE} onPagenationChange={handlePagenationChange} />
		</Layout>
	);
}

export default Users