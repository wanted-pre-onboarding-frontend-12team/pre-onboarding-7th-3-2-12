import { Layout, Pagenation, UserGridTable } from "@src/components"
import { getUsers, getUsersByPagenation } from '@src/core/apis/user';
import { UserResponseDTO } from "@src/types/api";
import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react";

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

const PAGE_OFFSET = 20;
const DEFALUT_PAGE = 1;

const Users = () => {
	const [currentPage, setCurrentPage] = useState(DEFALUT_PAGE);
	const { data: users } = useQuery<UserResponseDTO[]>(['getUsers'], async () => getUsers());
  const { data: currentUsers } = useQuery<UserResponseDTO[]>(['getUsersByPagenation', currentPage], async () =>
		getUsersByPagenation(currentPage, PAGE_OFFSET),
	);
	const totalPage = useMemo(() => users && Math.floor(users.length / PAGE_OFFSET), [users]); 

	const handlePagenationChange = (newPage: number) => {
		setCurrentPage(newPage);
	}
	
  return (
		<Layout>
			<UserGridTable
				tableHeadTrs={tableHeadTrs}
				tableBodyList={currentUsers}
				gridCols="[minmax(150px,_1fr)_minmax(120px,_1fr)_minmax(150px,_1fr)_minmax(200px,_1fr)_minmax(150px,_1fr)_minmax(180px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(120px,_1fr)_minmax(150px,_1fr)_minmax(120px,_1fr)]"
			/>
			<Pagenation currentPage={currentPage} totalPage={totalPage ?? DEFALUT_PAGE} onPagenationChange={handlePagenationChange} />
		</Layout>
	);
}

export default Users