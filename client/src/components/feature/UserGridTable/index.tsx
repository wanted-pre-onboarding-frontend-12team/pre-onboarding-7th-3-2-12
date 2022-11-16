import React from "react";
import { Link } from 'react-router-dom';
import { Button } from '@src/components';
import { UserResponseDTO } from "@src/types/api";
import { isValidArray } from "@src/utils/isValidArray";
import { nameMasker, phoneNumberMasker, dateISOStringToFullDay, genderCodeToGender } from '@src/core/adminDataConverter';

type Props = {
  tableHeadTrs: string[],
  tableBodyList: UserResponseDTO[] | undefined,
}

const UserGridTable = (props: Props) => {
	return (
		<ul
			className={`grid grid-cols-[minmax(150px,_1fr)_minmax(120px,_1fr)_minmax(150px,_1fr)_minmax(200px,_1fr)_minmax(150px,_1fr)_minmax(180px,_1fr)_minmax(150px,_1fr)_minmax(150px,_1fr)_minmax(120px,_1fr)_minmax(150px,_1fr)_minmax(120px,_1fr)]`}
		>
			{isValidArray(props.tableHeadTrs) &&
				props.tableHeadTrs?.map((tableHeadTr, index) => {
					return (
						<li
							key={index}
							className="flex items-center justify-center py-2 px-5 border border-solid border-gray-300 bg-[#FAFAFA] text-center"
						>
							{tableHeadTr}
						</li>
					);
				})}
			{isValidArray(props.tableBodyList) &&
				props.tableBodyList?.map((tableBodyItem) => {
					const { id, name, gender_origin, birth_date, email, phone_number, created_at, last_login } = tableBodyItem;

					return (
						<React.Fragment key={id}>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								<Link to={`/users/${id}`} className="border-b-2 border-black hover:text-blue-500 hover:border-blue-500">
									{name && nameMasker(name)}
								</Link>
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{gender_origin && genderCodeToGender(gender_origin)}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{birth_date && dateISOStringToFullDay(birth_date)}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{email}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{phone_number && phoneNumberMasker(phone_number)}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{'⭕️'}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{'❌'}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{created_at && dateISOStringToFullDay(created_at)}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{'2'}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
								{last_login && dateISOStringToFullDay(last_login)}
							</li>
							<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid ">
								<Button
									type="button"
									onClick={() => console.log('삭제')}
									className="px-6 py-1 text-white bg-red-600 rounded-md opacity-80 hover:opacity-100"
								>
									삭제
								</Button>
							</li>
						</React.Fragment>
					);
				})}
		</ul>
	);
};

export default UserGridTable;