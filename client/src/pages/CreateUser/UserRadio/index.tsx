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
	return (
		<div className="flex">
			<label className="w-[220px]" htmlFor={name}>
				{children}
			</label>
			<div className="flex items-center gap-3">
				<input
					className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					id={trueId}
					value={'true'}
					type="radio"
					name={name}
					onChange={onChange}
				/>
				<label htmlFor={trueId}>{trueLabel}</label>
				<input
					className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					id={falseId}
					value={'false'}
					type="radio"
					name={name}
					onChange={onChange}
					defaultChecked
				/>
				<label htmlFor={falseId}>{falseLabel}</label>
			</div>
		</div>
	);
};

export default UserRadio;
