import { Link, useLocation } from 'react-router-dom';
import { Logo, AccountIcon, UserIcon, DashboardIcon, LogoutIcon  } from '@src/assets/icons';
import { removeLocalStorageItem } from '@src/utils/storage';
import { ACCESS_TOKEN_KEY } from '@src/core/apis/common';
import { ROUTE_PATH } from '@src/router/routePath';

const Sidebar = () => {
	const locator = useLocation();
	const handleLogoutBtnClick = () => {
		removeLocalStorageItem(ACCESS_TOKEN_KEY);
		window.location.reload();
	}

	return (
		<div className="w-60 h-screen bg-[#041527]">
			<header className="flex items-center justify-center h-20">
				<img src={Logo} className="h-14 bg-[#041527]" />
			</header>
			<Link
				to="/"
				className={`flex items-center py-6 font-medium text-white px-9 text-1xl ${
					locator.pathname === ROUTE_PATH.DASHBOARD && 'bg-blue-500'
				}`}
			>
				<img src={DashboardIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">대시보드</p>
			</Link>
			<Link
				to="/accounts"
				className={`flex items-center py-6 font-medium text-white px-9 text-1xl ${
					locator.pathname.includes(ROUTE_PATH.ACCOUNTS) && 'bg-blue-500'
				}`}
			>
				<img src={AccountIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">계좌 목록</p>
			</Link>
			<Link
				to="/users"
				className={`flex items-center py-6 font-medium text-white px-9 text-1xl ${
					locator.pathname.includes(ROUTE_PATH.USERS) && 'bg-blue-500'
				}`}
			>
				<img src={UserIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">사용자</p>
			</Link>
			<button
				type="button"
				className="flex items-center w-full py-6 font-medium text-white px-9 text-1xl"
				onClick={handleLogoutBtnClick}
			>
				<img src={LogoutIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">로그아웃</p>
			</button>
		</div>
	);
};

export default Sidebar;
