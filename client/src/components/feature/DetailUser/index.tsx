import Layout from '@src/components/layout';
import { getOneUser, getOneUserSetting } from '@src/core/apis/user';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../UserInfo';

const DetailUser = () => {
	const { uuid } = useParams<string>();
	const [info, setInfo] = useState<object>();
	const [editMode, setEditMode] = useState<boolean>(false);
	const { data } = useQuery<any>(['getOneUser', uuid], async () => getOneUser(uuid as string));
	const { data: userSettingData } = useQuery<any>(['getOneUserSetting', uuid], async () => getOneUserSetting(uuid as string));
	const ref = useRef<HTMLInputElement>(null);

	const onEdit = () => {
		setEditMode((prev) => !prev);
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (ref && ref.current) {
			console.log(ref.current.value);
		}
	};

	useEffect(() => {
		if (data && userSettingData) {
			setInfo(Object.assign(data[0], ...userSettingData));
		}
	}, [data, userSettingData]);

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
				<h1 className="text-2xl pt-8 pb-8"> 계좌 목록</h1>
			</section>
		</Layout>
	);
};

export default DetailUser;
