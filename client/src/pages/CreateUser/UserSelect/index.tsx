import React from 'react';

type Props = {
	name: string;
	id: string;
	label: string;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	children: React.ReactNode;
};

const UserSelect = ({ onChange, name, id, label, children }: Props) => {
	return (
		<div className="flex">
			<label className="w-[150px] flex items-center" htmlFor={id}>
				{label}
			</label>
			<select name={name} id={id} onChange={onChange} className="border-solid border-2 rounded-md border-slate-400 w-[200px] p-2">
				{children}
			</select>
		</div>
	);
};

export default UserSelect;
