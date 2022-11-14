export const getLocalStorage = (key: string) => {
	try {
		return localStorage.getItem(key) || null;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export const setLocalStorage = (key: string, value: any) => {
	try {
		if (!value) {
			throw new Error('Value is Empty !');
		}

		localStorage.setItem(key, value);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error('Fail setLocalStorage : Max Local Storage Size !');
		}
	}
};

export const removeLocalStorageItem = (key: string) => {
	localStorage.removeItem(key);
};
