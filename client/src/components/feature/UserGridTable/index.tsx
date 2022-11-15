import React from "react";
import { Button } from '@src/components';
import { UserResponseDTO } from "@src/types/api";
import { isValidArray } from "@src/utils/isValidArray";
import { Link } from "react-router-dom";

type Props = {
  tableHeadTrs: string[],
  tableBodyList: UserResponseDTO[] | undefined,
  gridCols: string;
}

const UserGridTable = (props: Props) => {
	return (
		<ul className={`grid grid-cols-${props.gridCols}`}>
			{isValidArray(props.tableHeadTrs) && props.tableHeadTrs?.map((tableHeadTr, index) => {
				return (
					<li key={index} className="py-2 px-5 border border-solid border-gray-300 bg-[#FAFAFA] text-center">
						{tableHeadTr}
					</li>
				);
			})}
			{isValidArray(props.tableBodyList) && props.tableBodyList?.map((tableBodyItem) => {
				const { id, name, gender_origin, birth_date, email, phone_number, created_at, last_login } = tableBodyItem;

				return (
					<React.Fragment key={id}>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							<Link to={`/users/${id}`}>{name}</Link>
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{gender_origin}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{birth_date}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{email}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{phone_number}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{'⭕️'}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{'❌'}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{created_at}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{'2'}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid">
							{last_login}
						</li>
						<li className="flex items-center justify-center px-4 py-2 text-center bg-white border border-gray-300 border-solid ">
							<Button type="button" onClick={() => console.log('삭제')} tclass="rounded-md bg-red-600 text-white px-6 py-1">
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