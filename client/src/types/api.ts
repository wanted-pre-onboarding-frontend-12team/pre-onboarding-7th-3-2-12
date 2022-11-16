export type User = {
	id: number;
	email: string;
	name: string;
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
	broker_id: Broker_id;
	status: Status;
	number: string;
	name: AccountName;
	assets: string;
	payments: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};

export type Status = 9999 | 1 | 2 | 3 | 4;

export type Broker_id =
	| '209'
	| '218'
	| '230'
	| '238'
	| '240'
	| '243'
	| '247'
	| '261'
	| '262'
	| '263'
	| '264'
	| '265'
	| '266'
	| '267'
	| '268'
	| '269'
	| '270'
	| '271'
	| '279'
	| '280'
	| '287'
	| '288'
	| '290'
	| '291'
	| '292';

export type AccountName =
	| 'Home Loan Account'
	| 'Auto Loan Account'
	| 'Checking Account'
	| 'Credit Card Account'
	| 'Personal Loan Account'
	| 'Investment Account'
	| 'Savings Account'
	| 'Money Market Account';
