import { Link } from 'react-router-dom';
import { Logo, AccountIcon, UserIcon, DashboardIcon, LogoutIcon  } from '@src/assets/icons';
import { removeLocalStorageItem } from '@src/utils/storage';
import { ACCESS_TOKEN_KEY } from '@src/core/apis/common';

const Sidebar = () => {
	const handleLogoutBtnClick = () => {
		removeLocalStorageItem(ACCESS_TOKEN_KEY);
		window.location.reload();
	}

	return (
		<div className="flex flex-col w-200px h-screen bg-[#041527]">
			<header className="flex items-center justify-center">
				<img src={Logo} className="h-20 bg-[#041527]" />
			</header>
			<Link to="/" className="flex items-center pt-10 pb-5 font-medium text-white text-1xl px-9">
				<img src={DashboardIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">대시보드</p>
			</Link>
			<Link to="/accounts" className="flex items-center pt-10 pb-5 font-medium text-white text-1xl px-9">
				<img src={AccountIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">계좌 목록</p>
			</Link>
			<Link to="/users" className="flex items-center pt-10 pb-5 font-medium text-white text-1xl px-9">
				<img src={UserIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">사용자</p>
			</Link>
			<button type="button" className="flex items-center pt-10 pb-5 font-medium text-white text-1xl px-9" onClick={handleLogoutBtnClick}>
				<img src={LogoutIcon} className="w-6" />
				<p className="pl-5 text-2xl font-light">로그아웃</p>
			</button>
		</div>
	);
};

export default Sidebar;
