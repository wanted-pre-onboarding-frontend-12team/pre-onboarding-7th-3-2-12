import React, { forwardRef } from 'react';

type Props = {
	name: string;
	id: string;
	type?: 'text' | 'date' | 'number' | 'tel' | 'email' | 'file';
	accept?: 'image/*';
	readOnly?: boolean;
	width?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: React.MouseEventHandler<HTMLInputElement>) => void;
	children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UserInput = (
	{ name, id, type = 'text', onChange, onClick, children, readOnly = false, width }: Props,
	ref: React.Ref<HTMLInputElement>,
) => {
	return (
		<div className="flex">
			<label htmlFor={id} className="w-[200px] mb-[6px]">
				{children}
			</label>
			<input
				className={`border-solid border-2 border-slate-400 ${width}`}
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
