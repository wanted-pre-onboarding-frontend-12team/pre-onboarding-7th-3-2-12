const SearchInput = () => {
	return (
		<form className="flex items-center">
			<input placeholder="검색어를 입력하세요." className="h-10 w-48 px-4 mr-1 border-solid border rounded  outline-none" />
			<button className="h-10 w-12 rounded bg-[#041527] text-white font-bold">검색</button>
		</form>
	);
};

export default SearchInput;
