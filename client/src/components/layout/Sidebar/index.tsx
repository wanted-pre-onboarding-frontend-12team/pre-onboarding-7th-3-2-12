import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from '@src/assets/icons';
import { sider } from '@src/utils/sidebarList';
import { removeLocalStorageItem } from '@src/utils/storage';
import { ACCESS_TOKEN_KEY } from '@src/core/apis/common';

const Sidebar = () => {
	const [bgColor, setBgColor] = useState('');
	const location = useLocation();
	useEffect(() => {
		const splitedPathname = location.pathname.split('/')[1];
		const filteredName = sider.filter((prev) => prev.keyword === splitedPathname)[0].name;
		setBgColor(filteredName);
	}, [location]);

	const handleLogoutClick = () => {
		const confirm = window.confirm('로그아웃 하시겠습니까?');
		if (confirm) {
			removeLocalStorageItem(ACCESS_TOKEN_KEY);
			window.location.reload();
		}
	};

	return (
		<div className="w-60 h-screen bg-[#041527]">
			<header className="flex items-center justify-center h-20">
				<img src={Logo} className="h-14 bg-[#041527]" />
			</header>
			{sider &&
				sider.map((el) =>
					el.id < 10 ? (
						<Link
							to={`/${el.keyword}`}
							key={el.id}
							className={`flex items-center text-1xl text-white  ${
								bgColor === el.name && `bg-[#4690F7]`
							} font-medium px-9 py-6 pb-5`}
						>
							<img src={el.src} className="w-6" />
							<p className="text-2xl font-light pl-5">{el.name}</p>
						</Link>
					) : (
						<button
							type="button"
							key={el.id}
							className="flex items-center text-1xl text-white font-medium px-9 py-5 pb-5"
							onClick={handleLogoutClick}
						>
							<img src={el.src} className="w-6" />
							<p className="text-2xl font-light pl-5">{el.name}</p>
						</button>
					),
				)}
		</div>
	);
};

export default Sidebar;
