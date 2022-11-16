import create from 'zustand';

export interface User {
	id?: number;
	uuid?: string;
	photo?: string;
	name?: string;
	email?: string;
	age?: number;
	gender_origin?: 1 | 2 | 3 | 4;
	birth_date?: string;
	phone_number?: string;
	address?: string;
	detail_address?: string;
	last_login?: string;
	created_at?: string;
	updated_at?: string;
}

export interface UserSetting {
	id?: number;
	uuid?: string;
	allow_marketing_push?: boolean;
	allow_invest_push?: boolean;
	is_active?: boolean;
	is_staff?: boolean;
	created_at?: string;
	updated_at?: string;
}

type Store = {
	user: User;
	userSetting: UserSetting;
	setUser: (user: User) => void;
	setUserSetting: (userSetting: UserSetting) => void;
	updateUser: (name: string) => void;
	resetUser: () => void;
	resetUserSetting: () => void;
};

const useUserStore = create<Store>(
	(set): Store => ({
		user: {},
		userSetting: {},
		setUser: (user: User) => set((state) => ({ ...state, user })),
		setUserSetting: (userSetting: UserSetting) => set((state) => ({ ...state, userSetting })),
		updateUser: (name: string) => set((state) => ({ ...state, name })),
		resetUser: () => set((state) => ({})),
		resetUserSetting: () => set((state) => ({})),
	}),
);

export default useUserStore;
