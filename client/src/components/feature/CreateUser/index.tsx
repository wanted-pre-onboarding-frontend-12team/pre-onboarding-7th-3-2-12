import React, { useRef, useState, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import { onAddSetting, onAddUser } from '../../../apis/user';
import { SignInResponseDTO } from '../../../types/api';
import { makeUUID } from '../../../utils/makeUUID';
import useUserStore from '../../../utils/useUserStore';
import UserInput from './UserInput';
import UserRadio from './UserRadio';
import UserSelect from './UserSelect';

const CreateUser = () => {
	const [userInfo, setUserInfo] = useState({});
	const [userSetting, setUserSetting] = useState({});
	const [file, setFile] = useState<MediaSource | Blob>();
	const [uuid, SetUuid] = useState('');
	const open = useDaumPostcodePopup();
	const addressRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const store = useUserStore((state) => state);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const SAVE_MESSAGE = '저장하시겠습니까?';
		if (window.confirm(SAVE_MESSAGE)) {
			const response = await onAddUser(userInfo);
			const settingResponse = await onAddSetting(userSetting);
			if (response) {
				store.setUser(response.user);
			}
			if (settingResponse) {
				console.log(settingResponse);
				store.setUserSetting(settingResponse);
				console.log('store user..  ');
				console.log(store.user);
				console.log(store.userSetting);
				navigate(`/uuid`);
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

	const onCancle = () => {
		setUserInfo({});
		setUserSetting({});
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
		setUserInfo({ ...userInfo, password: '12345', uuid: uuid });
		setUserSetting({ ...userSetting, uuid: uuid });
	}, [uuid]);

	return (
		<section className="p-[16px]">
			<h1 className="text-xl">신규 사용자 정보 등록</h1>
			<form onSubmit={onSubmit}>
				<section className="grid gap-2">
					<UserInput name="photo" id="photo" type="file" accept="image/*" onChange={onChange}>
						사용자 프로필
					</UserInput>
					<div>{file && <img className="w-48" src={URL.createObjectURL(file)} alt="local image" />}</div>
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
					<UserInput name="birth_date" id="birthDate" type="date" onChange={onChange}>
						생년월일
					</UserInput>
					<UserInput name="phone_number" id="phoneNumber" type="tel" onChange={onChange}>
						전화번호
					</UserInput>
					<UserInput ref={addressRef} readOnly={true} onClick={onPostClick} id="address" name="address" width="w-[700px]">
						주소
					</UserInput>
					<UserInput name="detail_address" id="detailAddress" onChange={onChange} width="w-[500px]">
						상세 주소
					</UserInput>
					<UserInput name="email" id="email" type="email" onChange={onChange}>
						이메일
					</UserInput>
				</section>
				<section className="grid gap-2 pt-3">
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
				<section className="flex justify-end px-[16px]">
					<button type="submit">저장</button>
				</section>
			</form>
		</section>
	);
};

export default CreateUser;
