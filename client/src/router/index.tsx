import { Routes, Route } from 'react-router-dom';
import { Login, DashBoard, Users, Account, AccountDetail, DetailUser, CreateUser } from '@src/pages';
import PrivateRoute from '@src/router/privateRouter';
import { ROUTE_PATH, PRIVATE_PATH } from '@src/router/routePath';
import { isValidArray } from '@src/utils/isValidArray';

const routes = [
	{ id: 1, path: ROUTE_PATH.DASHBOARD, element: <DashBoard /> },
	{ id: 2, path: ROUTE_PATH.ACCOUNTS, element: <Account /> },
	{ id: 3, path: ROUTE_PATH.USERS, element: <Users /> },
	{ id: 4, path: ROUTE_PATH.DETAIL_USER, element: <DetailUser /> },
	{ id: 5, path: ROUTE_PATH.ACCOUNTDETAIl, element: <AccountDetail /> },
	{ id: 6, path: ROUTE_PATH.CREATE_USER, element: <CreateUser /> },
];

const Router = () => {
	return (
		<Routes>
			<Route element={<PrivateRoute authentication={false} />}>
				<Route path={PRIVATE_PATH.LOGIN} element={<Login />} />
			</Route>

			<Route element={<PrivateRoute authentication={true} />}>
				{isValidArray(routes) && routes.map(({ id, path, element }) => <Route key={id} path={path} element={element} />)}
			</Route>
		</Routes>
	);
};

export default Router;
