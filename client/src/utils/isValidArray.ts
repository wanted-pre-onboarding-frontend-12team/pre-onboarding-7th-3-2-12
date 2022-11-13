export const isValidArray = (target: any) => {
	if (!target || !Array.isArray(target)) return false;
	return target.length > 0;
};
