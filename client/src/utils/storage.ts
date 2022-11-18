const EXPIRE_TIME = 3600 * 1000;

export const getLocalStorage = (key: string) => {
	try {
		const data = localStorage.getItem(key);
		if (!data) {
			return null;
		}
		const item = JSON.parse(data);
		if (Date.now() > item.expiry) {
			removeLocalStorageItem(key);
			return null;
		}
		return item.value;
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
		const nowDate = new Date();
		const data = { value, expiry: nowDate.getTime() + EXPIRE_TIME };
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		if (error instanceof Error) {
			throw new Error('Fail setLocalStorage : Max Local Storage Size !');
		}
	}
};

export const removeLocalStorageItem = (key: string) => {
	localStorage.removeItem(key);
};
