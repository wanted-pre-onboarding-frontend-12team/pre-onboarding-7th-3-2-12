import { Layout } from "@src/components"
import { getUsers } from "@src/core/apis/user"
import { UserResponseDTO } from "@src/types/api";
import { useQuery } from "@tanstack/react-query"

const Users = () => {
  const { data } = useQuery<UserResponseDTO[]>(['getUsers'], async () =>  getUsers(), {
    onSuccess: (data: UserResponseDTO[]) => {
      console.log(data);
    }
  });

  

  return (
    <Layout>Users</Layout>
  )
}

export default Users