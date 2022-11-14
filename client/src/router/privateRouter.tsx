import { ACCESS_TOKEN_KEY } from '@src/core/apis/common';
import { getLocalStorage } from '@src/utils/storage';
import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PRIVATE_PATH, ROUTE_PATH } from '@src/router/routePath';

interface PrivateRouteProps {
	children?: ReactElement;
	authentication: boolean;
}

const PrivateRoute = ({ authentication }: PrivateRouteProps): React.ReactElement | null => {
	const isAuthenticated = getLocalStorage(ACCESS_TOKEN_KEY);

	if (authentication) {
		return isAuthenticated ? <Outlet /> : <Navigate to={PRIVATE_PATH.LOGIN} />;
	} else {
		return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_PATH.DASHBOARD} />;
	}
};

export default PrivateRoute;
