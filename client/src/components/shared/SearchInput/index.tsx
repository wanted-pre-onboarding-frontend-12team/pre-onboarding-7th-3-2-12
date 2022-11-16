import React, { SetStateAction, useRef } from 'react';

type Props = {
	setSearch: React.Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ setSearch }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputRef.current) setSearch(inputRef.current?.value);
	};

	return (
		<form className="flex items-center" onSubmit={searchSubmit}>
			<input
				type="text"
				ref={inputRef}
				placeholder="검색어를 입력하세요."
				className="h-10 w-48 px-4 mr-1 border-solid border rounded  outline-none"
			/>
			<button type="submit" className="h-10 w-12 rounded bg-[#041527] text-white font-bold">
				검색
			</button>
		</form>
	);
};

export default SearchInput;
