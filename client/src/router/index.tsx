import { Routes, Route } from 'react-router-dom';

import { Login, DashBoard, Users } from '@src/pages';
import { ROUTE_PATH, PRIVATE_PATH } from '@src/router/routePath';
import { isValidArray } from '@src/utils/isValidArray';
import PrivateRoute from '@src/router/privateRouter';

const routes = [
	{ id: 1, path: ROUTE_PATH.DASHBOARD, element: <DashBoard /> },
	{ id: 2, path: ROUTE_PATH.USERS, element: <Users /> },
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
