import React, { useRef } from 'react';

type Props = {
	onSearchByKeyword: (keyword: string) => void;
};

const SearchInput = (props: Props) => {
	const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>

	const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.onSearchByKeyword(searchInputRef?.current?.value);
	}

	return (
		<form className="flex items-center" onSubmit={handleSearchFormSubmit}>
			<input
				ref={searchInputRef}
				placeholder="검색어를 입력하세요."
				className="h-10 w-48 px-4 mr-1 border-solid border rounded  outline-none"
			/>
			<button type="submit" className="h-10 w-12 rounded bg-[#041527] text-white font-bold opacity-80 hover:opacity-100">
				검색
			</button>
		</form>
	);
};

export default SearchInput;
