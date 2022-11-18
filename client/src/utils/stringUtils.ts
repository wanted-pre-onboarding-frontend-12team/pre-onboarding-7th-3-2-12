export const generateQueryString = (obj: Record<string, any>) => {
	return `?${new URLSearchParams(obj).toString()}`;
};
