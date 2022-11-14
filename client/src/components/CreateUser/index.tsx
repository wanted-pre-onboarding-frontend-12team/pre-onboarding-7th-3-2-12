import React, { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import UserInput from './UserInput';
import UserRadio from './UserRadio';
import UserSelect from './UserSelect';

const CreateUser = () => {
	const [userInfo, setUserInfo] = useState({});
	const [userSetting, setUserSetting] = useState({});
	const open = useDaumPostcodePopup();
	const addressRef = useRef<HTMLInputElement>(null);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		setUserInfo({ ...userInfo, created_at: Date.now() });
		setUserSetting({ ...userSetting, created_at: Date.now() });
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
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

	return (
		<section className="">
			<h1>신규 사용자 정보</h1>
			<form className="grid grid-cols-3" onSubmit={onSubmit}>
				<UserInput name="photo" id="photo" type="file" accept="image/*" onChange={onChange}>
					사용자 프로필
				</UserInput>
				<UserInput name="name" id="name" onChange={onChange}>
					이름
				</UserInput>
				<UserSelect label="성별" id="gender" name="gender_origin" onChange={onChange}>
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
				<UserInput name="email" id="email" type="email" onChange={onChange}>
					이메일
				</UserInput>
				<UserInput ref={addressRef} readOnly={true} onClick={onPostClick} id="address" name="address">
					주소
				</UserInput>
				<UserInput name="detail_address" id="detailAddress" onChange={onChange}>
					상세 주소
				</UserInput>
				<UserRadio id="allowMarketing" name="allow_marketing_push" trueId="marketingAllow" falseId="marketingNotAllow">
					마케팅 정보 수신 동의 여부
				</UserRadio>
				<UserRadio id="allowInvest" name="allow_invest_push" trueId="investAllow" falseId="investNotAllow">
					투자 정보 수신 동의 여부
				</UserRadio>
				<UserRadio id="isActive" name="is_active" trueLabel="활성화" falseLabel="비활성화" trueId="active" falseId="unActive">
					활성화 여부
				</UserRadio>
				<UserRadio id="isStaff" name="is_staff" trueLabel="임직원" falseLabel="해당 없음" trueId="staff" falseId="notStaff">
					임직원 여부
				</UserRadio>
				<button type="submit">저장</button>
				<button onClick={onCancle}>취소</button>
			</form>
		</section>
	);
};

export default CreateUser;
