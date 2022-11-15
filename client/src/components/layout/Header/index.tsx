const Header = () => {
	const userName = localStorage.getItem('USER_NAME');

	return (
		<div className="flex items-center justify-between fixed top-0 w-3/4 h-20 px-5 ">
			<p className="text-xl">계좌 목록</p>
			<p className="text-xl">{userName}</p>
		</div>
	);
};

export default Header;
