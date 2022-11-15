import { Routes, Route } from 'react-router-dom';
import { Login, DashBoard, Users, BankAccount } from '@src/pages';
import PrivateRoute from '@src/router/privateRouter';
import { ROUTE_PATH, PRIVATE_PATH } from '@src/router/routePath';
import { isValidArray } from '@src/utils/isValidArray';

const routes = [
	{ id: 1, path: ROUTE_PATHS.DASHBOARD, element: <DashBoard /> },
  { id: 2, path: ROUTE_PATHS.ACCOUNTS, element: <BankAccount />},
	{ id: 3, path: ROUTE_PATHS.USERS, element: <Users /> },
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
