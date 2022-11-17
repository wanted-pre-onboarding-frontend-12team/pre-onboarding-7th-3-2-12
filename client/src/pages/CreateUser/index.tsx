import Layout from '@src/components/layout';
import { onAddSetting, onAddUser } from '@src/core/apis/user';
import React, { useRef, useState, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import { makeUUID } from '@src/utils/makeUUID';
import UserInput from './UserInput';
import UserRadio from './UserRadio';
import UserSelect from './UserSelect';

const CreateUser = () => {
	const [userInfo, setUserInfo] = useState({
		password: '12345',
		uuid: '',
		address: '',
		gender_origin: 1,
	});
	const [userSetting, setUserSetting] = useState({
		allow_marketing_push: false,
		allow_invest_push: false,
		is_active: false,
		is_staff: false,
		uuid: '',
	});
	const [file, setFile] = useState<MediaSource | Blob>();
	const [uuid, SetUuid] = useState('');
	const open = useDaumPostcodePopup();
	const addressRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const SAVE_MESSAGE = '저장하시겠습니까?';
		if (window.confirm(SAVE_MESSAGE)) {
			const response = await onAddUser(userInfo);
			const settingResponse = await onAddSetting(userSetting);
			if (response && settingResponse) {
				const { uuid, id } = response.user;
				navigate(`/users/${uuid}/${id}`, { replace: true });
			}
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, files } = e.currentTarget;

		if (type === 'file' && files) {
			setFile(files[0]);
			return;
		}

		if (type === 'radio') {
			setUserSetting({ ...userSetting, [name]: value });
			return;
		}
		setUserInfo({ ...userInfo, [name]: value });
	};

	const onSelctChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.currentTarget;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const onPostClick = () => {
		open({ onComplete: handleComplete });
	};

	const handleComplete = (data: any) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		if (addressRef && addressRef.current) {
			addressRef.current.value = fullAddress;
			setUserInfo({ ...userInfo, ['address']: fullAddress });
		}
	};

	useEffect(() => {
		SetUuid(makeUUID());
	}, []);

	useEffect(() => {
		setUserInfo({ ...userInfo, uuid: uuid });
		setUserSetting({ ...userSetting, uuid: uuid });
	}, [uuid]);

	return (
		<Layout>
			<h1 className="text-xl pb-8 font-bold">신규 고객 생성</h1>
			<form onSubmit={onSubmit}>
				<section className="grid gap-3">
					<UserInput name="name" id="name" onChange={onChange}>
						이름
					</UserInput>
					<UserSelect label="성별" id="gender" name="gender_origin" onChange={onSelctChange}>
						<option value="1">남성(1)</option>
						<option value="2">여성(2)</option>
						<option value="3">남성(3)</option>
						<option value="4">여성(4)</option>
					</UserSelect>
					<UserInput name="age" id="age" type="number" onChange={onChange}>
						나이
					</UserInput>
					<UserInput name="birth_date" id="birthDate" type="date" onChange={onChange} width="w-[200px]">
						생년월일
					</UserInput>
					<UserInput name="phone_number" id="phoneNumber" type="tel" onChange={onChange}>
						전화번호
					</UserInput>
					<UserInput ref={addressRef} readOnly={true} onClick={onPostClick} id="address" name="address" width="w-[500px]">
						주소
					</UserInput>
					<UserInput name="detail_address" id="detailAddress" onChange={onChange} width="w-[500px]">
						상세 주소
					</UserInput>
					<UserInput name="email" id="email" type="email" onChange={onChange}>
						이메일
					</UserInput>
				</section>
				<section className="grid gap-3 pt-3">
					<UserRadio
						id="allowMarketing"
						name="allow_marketing_push"
						trueId="marketingAllow"
						falseId="marketingNotAllow"
						onChange={onChange}
					>
						마케팅 정보 수신 동의 여부
					</UserRadio>
					<UserRadio id="allowInvest" name="allow_invest_push" trueId="investAllow" falseId="investNotAllow" onChange={onChange}>
						투자 정보 수신 동의 여부
					</UserRadio>
					<UserRadio
						id="isActive"
						name="is_active"
						trueLabel="활성화"
						falseLabel="비활성화"
						trueId="active"
						falseId="unActive"
						onChange={onChange}
					>
						활성화 여부
					</UserRadio>
					<UserRadio
						id="isStaff"
						name="is_staff"
						trueLabel="임직원"
						falseLabel="해당 없음"
						trueId="staff"
						falseId="notStaff"
						onChange={onChange}
					>
						임직원 여부
					</UserRadio>
				</section>
				<section className="flex justify-end px-[16px] pt-4">
					<button className="h-10 w-12 rounded bg-[#041527] text-white font-bold" type="submit">
						저장
					</button>
				</section>
			</form>
		</Layout>
	);
};

export default CreateUser;
