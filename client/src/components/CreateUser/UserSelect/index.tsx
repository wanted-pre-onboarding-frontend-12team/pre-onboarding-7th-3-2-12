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
		<div className="flex flex-col mb-[8px]">
			<label className="mb-[6px]" htmlFor={id}>
				{label}
			</label>
			<select name={name} id={id} onChange={onChange} className="border-solid border-2 border-slate-400 w-1/3 mb-[6px]">
				{children}
			</select>
		</div>
	);
};

export default UserSelect;
