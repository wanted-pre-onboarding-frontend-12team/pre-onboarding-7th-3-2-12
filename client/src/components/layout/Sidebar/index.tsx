import { Link } from 'react-router-dom';
import { Logo, AccountIcon, UserIcon, DashboardIcon, LogoutIcon  } from '@src/assets/icons';

const Sidebar = () => {
	return (
		<div className="flex flex-col w-72 h-screen bg-[#041527]">
			<header className="flex justify-center items-center">
				<img src={Logo} className="h-20 bg-[#041527]" />
			</header>
      <Link to="/" className="flex items-center text-1xl text-white font-medium px-9 pt-10 pb-5">
				<img src={DashboardIcon} className="w-6" />
			  <p className="text-2xl font-light pl-5">대시보드</p>
			</Link>
			<Link to="/accounts" className="flex items-center text-1xl text-white font-medium px-9 pt-10 pb-5">
				<img src={AccountIcon} className="w-6" />
				<p className="text-2xl font-light pl-5">계좌 목록</p>
			</Link>
			<Link to="/users" className="flex items-center text-1xl text-white font-medium px-9 pt-10 pb-5">
				<img src={UserIcon} className="w-6" />
				<p className="text-2xl font-light pl-5">사용자</p>
			</Link>
      <button type="button" className="flex items-center text-1xl text-white font-medium px-9 pt-10 pb-5">
				<img src={LogoutIcon} className="w-6" />
				<p className="text-2xl font-light pl-5">로그아웃</p>
			</button>
		</div>
	);
};

export default Sidebar;
