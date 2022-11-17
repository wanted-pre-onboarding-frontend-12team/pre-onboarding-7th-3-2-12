import Layout from '@src/components/layout';
import { getUser, getUserSetting, updateUserName } from '@src/core/apis/user';
import { UserObject, UserResponseDTO, UserSettingResponseDTO } from '@src/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../UserInfo';
import useUserAccounts from '@src/hooks/useUserAccounts';
import AccountGrid from '../AccountGrid';

const DetailUser = () => {
	const [info, setInfo] = useState<UserObject>();
	const [editMode, setEditMode] = useState<boolean>(false);
	const { uuid, id } = useParams<string>();
	const { userAccounts } = useUserAccounts(Number(id));
	const { data: userData } = useQuery<UserResponseDTO[]>(['getUser'], async () => getUser(uuid as string));
	const { data: userSettingData } = useQuery<UserSettingResponseDTO[]>(['getUserSetting', uuid], async () =>
		getUserSetting(uuid as string),
	);
	const ref = useRef<HTMLInputElement>(null);
	const QueryClient = useQueryClient();
	const updateName = useMutation(updateUserName, {
		onSuccess: () =>
			QueryClient.invalidateQueries(['getUser'], {
				refetchType: 'all',
			}),
	});

	const onEdit = () => {
		setEditMode((prev) => !prev);
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (userData && ref && ref.current) {
			const id = userData[0].id;
			const name = ref.current.value;
			updateName.mutate({ id, name });
			setEditMode((prev) => !prev);
		}
	};

	useEffect(() => {
		if (userData && userSettingData) {
			setInfo(Object.assign(userSettingData[0], ...userData));
		}
	}, [userData, userSettingData]);

	return (
		<Layout>
			<section>
				<header className="flex justify-between">
					<h1 className="text-2xl pb-8">사용자 정보</h1>
					<div className="flex gap-2">
						{editMode ? (
							<button className={`h-10 w-12 rounded bg-green-600 text-white font-bold`} onClick={onSubmit}>
								저장
							</button>
						) : (
							<button className={`h-10 w-12 rounded bg-[#041527] text-white font-bold`} onClick={onEdit}>
								수정
							</button>
						)}
						{editMode && (
							<button className="h-10 w-12 rounded bg-[#041527] text-white font-bold" onClick={onEdit}>
								취소
							</button>
						)}
					</div>
				</header>
				{info && <UserInfo info={info} editMode={editMode} ref={ref} />}
				<h1 className="text-2xl pt-8"> 계좌 목록</h1>
				{userAccounts && <AccountGrid accountList={userAccounts} />}
			</section>
		</Layout>
	);
};

export default DetailUser;
