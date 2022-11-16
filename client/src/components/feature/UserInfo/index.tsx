import { dateISOStringToFullDay, genderCodeToGender, nameMasker, phoneNumberMasker } from '@src/core/adminDataConverter';
import { User, UserSetting } from '@src/utils/useUserStore';

type Props = {
	info: User & UserSetting;
};

const UserInfo = ({ info }: Props) => {
	const {
		uuid,
		name,
		email,
		age,
		gender_origin,
		birth_date,
		phone_number,
		address,
		detail_address,
		allow_marketing_push,
		allow_invest_push,
		is_active,
		is_staff,
		created_at,
		last_login,
	} = info;

	return (
		<section className="grid grid-cols-[minmax(150px,_0.5fr)_minmax(300px,_1fr)_minmax(150px,_0.5fr)_minmax(300px,_1fr)] ">
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">이름</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">{name && nameMasker(name)}</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">혜택 수신 동의 여부</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{allow_marketing_push ? '⭕️' : '❌'}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">성별</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{gender_origin && genderCodeToGender(gender_origin)}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">투자 수신 동의 여부</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{allow_invest_push ? '⭕️' : '❌'}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">나이</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">{age}</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">계좌 활성화 여부</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">{is_active ? '⭕️' : '❌'}</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">생년월일</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{birth_date && dateISOStringToFullDay(birth_date)}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">임직원 여부</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">{is_staff ? '⭕️' : '❌'}</dd>
			<dt className="row-span-2 border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 flex justify-center items-center">
				주소
			</dt>
			<dd className="row-span-2 border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 flex justify-center items-center">
				{address} <br />
				{detail_address}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">가입일</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{created_at && dateISOStringToFullDay(created_at)}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">최근 로그인 날짜</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{last_login && dateISOStringToFullDay(last_login)}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">이메일</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">{email}</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center"></dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center"></dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">전화번호</dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center">
				{phone_number && phoneNumberMasker(phone_number)}
			</dd>
			<dt className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center"></dt>
			<dd className="border border-solid border-gray-300 bg-[#FAFAFA] px-4 py-2 text-center"></dd>
		</section>
	);
};

export default UserInfo;
