import { Routes, Route } from 'react-router-dom';
import { Login, DashBoard, Users } from '../pages';
import ROUTE_PATHS from './routePath';
import { isValidArray } from '../utils/isValidArray';

const routes = [
	{ id: 1, path: ROUTE_PATHS.DASHBOARD, element: <DashBoard /> },
	{ id: 2, path: ROUTE_PATHS.LOGIN, element: <Login /> },
	{ id: 3, path: ROUTE_PATHS.USERS, element: <Users /> }
];

const Router = () => {
	return (
		<Routes>
			{isValidArray(routes) && routes.map(({ id, path, element }) => <Route key={id} path={path} element={element} />)}
		</Routes>
	);
};

export default Router;
