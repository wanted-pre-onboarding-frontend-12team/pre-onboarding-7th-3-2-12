import React, { forwardRef } from 'react';

type Props = {
	name: string;
	id: string;
	type?: 'text' | 'date' | 'number' | 'tel' | 'email' | 'file';
	accept?: 'image/*';
	readOnly?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: React.MouseEventHandler<HTMLInputElement>) => void;
	children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UserInput = (
	{ name, id, type = 'text', onChange, onClick, children, readOnly = false }: Props,
	ref: React.Ref<HTMLInputElement>,
) => {
	return (
		<div className="flex flex-col mb-[8px]">
			<label htmlFor={id} className="mb-[6px]">
				{children}
			</label>
			<input
				className="border-solid border-2 border-slate-400"
				ref={ref}
				name={name}
				id={id}
				type={type}
				onChange={onChange}
				onClick={onClick}
				readOnly={readOnly}
			/>
		</div>
	);
};

export default forwardRef(UserInput);
