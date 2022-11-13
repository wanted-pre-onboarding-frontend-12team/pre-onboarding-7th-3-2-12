export const getLocalStorage = (key: string) => {
	try {
		const serialized = localStorage.getItem(key);

		if (!serialized) {
			throw new Error('Value is Empty !');
		}

		return JSON.parse(serialized);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export const setLocalStorage = (key: string, value: any) => {
	try {
		const serialized = JSON.stringify(value);

		if (!serialized) {
			throw new Error('Value is Empty !');
		}

		localStorage.setItem(key, serialized);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error('Fail setLocalStorage : Max Local Storage Size !');
		}
	}
};

export const removeLocalStorageItem = (key: string) => {
	localStorage.removeItem(key);
};
