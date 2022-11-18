import { getLocalStorage } from '@src/utils/storage';
import { useLocation } from 'react-router-dom';

const pathToPageDescription: { [path: string]: string } = {
	'/accounts': '계좌 목록',
	'/users': '고객 목록',
	'/users/post-user': '고객 생성',
} as const;

const Header = () => {
	const locator = useLocation();
	const userName = getLocalStorage('USER_NAME');

	return (
		<div className="flex items-center justify-between w-full h-20 px-8">
			<p className="text-xl">{pathToPageDescription[locator.pathname]}</p>
			<p className="text-xl">{userName}</p>
		</div>
	);
};

export default Header;
