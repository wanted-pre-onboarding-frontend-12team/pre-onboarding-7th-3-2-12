import { Layout, UserGridTable } from "@src/components"
import { getUsers } from "@src/core/apis/user"
import { UserResponseDTO } from "@src/types/api";
import { useQuery } from "@tanstack/react-query"

const tableHeadTrs = ['고객명', '성별(코드)', '생년월일', "이메일주소", "휴대폰번호", "혜택 수신동의 여부", "활성화 여부", "가입일", "보유 계좌수", "최근로그인 날짜", ""]

const Users = () => {
  const { data } = useQuery<UserResponseDTO[]>(['getUsers'], async () =>  getUsers(), {
    onSuccess: (data: UserResponseDTO[]) => {
      console.log(data);
    }
  });

  

  return (
		<Layout>
			<UserGridTable
				tableHeadTrs={tableHeadTrs}
				tableBodyList={data}
				gridCols="[minmax(100px,_1fr)_minmax(100px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(90px,_1fr)]"
			/>
		</Layout>
	);
}

export default Users