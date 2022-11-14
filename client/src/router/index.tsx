import { Routes, Route } from 'react-router-dom';
import { Login, DashBoard } from '../pages';
import ROUTE_PATHS from './routePath';
import { isValidArray } from '../utils/isValidArray';

const routes = [
	{ id: 1, path: ROUTE_PATHS.DASHBOARD, element: <DashBoard /> },
	{ id: 2, path: ROUTE_PATHS.LOG_IN, element: <Login /> },
];

const Router = () => {
	return (
		<Routes>
			{isValidArray(routes) && routes.map(({ id, path, element }) => <Route key={id} path={path} element={element} />)}
		</Routes>
	);
};

export default Router;
