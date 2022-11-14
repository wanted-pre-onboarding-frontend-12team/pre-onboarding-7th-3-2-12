export type User = {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
};

export type SignInResponseDTO = {
	accessToken: string;
	user: User;
};

export type UserResponseDTO = {
	id: number;
	uuid: string;
	photo: string;
	name: string;
	email: string;
	age: number;
	gender_origin: 1 | 2 | 3 | 4;
	birth_date: string;
	phone_number: string;
	address: string;
	detail_address: string;
	last_login: string;
	created_at: string;
	updated_at: string;
};

export type UserSettingResponseDTO = {
	id: number;
	uuid: string;
	allow_marketing_push: boolean;
	allow_invest_push: boolean;
	is_active: boolean;
	is_staff: boolean;
	created_at: string;
	updated_at: string;
};

export type AccountResponseDTO = {
	id: number;
	user_id: number;
	uuid: string;
	broker_id: string;
	status: number;
	number: string;
	name: string;
	assets: string;
	payments: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};
