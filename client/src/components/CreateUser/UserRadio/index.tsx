import React, { useState } from 'react';

type Props = {
	id: string;
	trueId: string;
	falseId: string;
	name: string;
	trueLabel?: string;
	falseLabel?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UserRadio = ({ name, trueLabel = '동의', falseLabel = '거부', trueId, falseId, children, onChange }: Props) => {
	const [selected, setSelected] = useState('');

	const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log(typeof e.currentTarget.value);
		setSelected(e.currentTarget.value);
	};

	return (
		<div className="flex">
			<label className="mr-[6px]" htmlFor={name}>
				{children}
			</label>
			<div className="mb-[8px] flex gap-2">
				<input id={trueId} value={'true'} type="radio" name={name} onChange={onChange} defaultChecked />
				<label htmlFor={trueId}>{trueLabel}</label>
				<input id={falseId} value={'false'} type="radio" name={name} onChange={onChange} />
				<label htmlFor={falseId}>{falseLabel}</label>
			</div>
		</div>
	);
};

export default UserRadio;
