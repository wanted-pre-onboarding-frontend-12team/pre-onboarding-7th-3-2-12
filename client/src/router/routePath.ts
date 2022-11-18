export const ROUTE_PATH = {
	DASHBOARD: '/',
	USERS: '/users',
	DETAIL_USER: '/users/:uuid/:id',
	CREATE_USER: '/users/post-user',
	ACCOUNTS: '/accounts',
	ACCOUNTDETAIl: '/accounts/:id',
	NOT_FOUND: '*',
} as const;

export const PRIVATE_PATH = {
	LOGIN: '/login',
};
