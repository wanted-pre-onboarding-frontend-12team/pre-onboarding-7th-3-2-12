import { Routes, Route } from 'react-router-dom';
import { Login, DashBoard, Users } from '@src/pages';
import ROUTE_PATHS from './routePath';
import { isValidArray } from '@src/utils/isValidArray';
import Account from '@src/pages/Account';
import AccountDetail from '@src/pages/AccountDetail';

const routes = [
	{ id: 1, path: ROUTE_PATHS.DASHBOARD, element: <DashBoard /> },
	{ id: 2, path: ROUTE_PATHS.LOGIN, element: <Login /> },
	{ id: 3, path: ROUTE_PATHS.USERS, element: <Users /> },
	{ id: 4, path: ROUTE_PATHS.ACCOUNTS, element: <Account /> },
	{ id: 5, path: ROUTE_PATHS.ACCOUNTDETAIl, element: <AccountDetail /> },
];

const Router = () => {
	return (
		<Routes>
			{isValidArray(routes) && routes.map(({ id, path, element }) => <Route key={id} path={path} element={element} />)}
		</Routes>
	);
};

export default Router;
