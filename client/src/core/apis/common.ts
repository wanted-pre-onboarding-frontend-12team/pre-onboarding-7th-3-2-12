export const httpMehthod = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
} as const;

export const httpStatusCode = {
	'200_OK': 200,
	'201_CREATED': 201,
	'400_BAD_REQUEST': 400,
	'404_NOT_FOUND': 404,
} as const;

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const USER_NAME = 'USER_NAME';

export const API_PATH = {
	auth: {
		signup: '/signup',
		signin: '/signin',
		register: '/register',
		login: '/login',
		users: '/users',
	},
	user: {
		users: '/users',
		setting: '/userSetting',
		accounts: '/accounts',
	},
} as const;
