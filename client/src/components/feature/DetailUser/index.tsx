import { getOneUser, getOneUserSetting } from '@src/core/apis/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../UserInfo';

const DetailUser = () => {
	const { uuid } = useParams<string>();
	const [info, setInfo] = useState<object>();
	const { data } = useQuery<any>(['getOneUser', uuid], async () => getOneUser('c679093e-9d70-4ea5-935b-c52484300248'));
	const { data: userSettingData } = useQuery<any>(['getOneUserSetting', uuid], async () => getOneUserSetting(uuid as string));

	const onEdit = () => {};

	useEffect(() => {
		if (data && userSettingData) {
			setInfo(Object.assign(data[0], ...userSettingData));
		}
	}, [data, userSettingData]);

	return (
		<section>
			<h1 className="text-2xl pb-8">사용자 정보</h1>
			<button onClick={onEdit}>수정</button>
			{info && <UserInfo info={info} />}
			<h1 className="text-2xl pt-8 pb-8"> 계좌 목록</h1>
		</section>
	);
};

export default DetailUser;
