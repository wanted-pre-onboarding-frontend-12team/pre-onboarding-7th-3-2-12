const MASK = '*';
const MIN_USER_NAME_SIZE = 2;
const MALE_GENDER_CODES = [1, 3, 5];
const FEMALE_GENDER_CODES = [0, 2, 4];

export const nameMasker = (name: string) => {
	if (name.length < MIN_USER_NAME_SIZE) {
		return name;
	} else if (name.length === MIN_USER_NAME_SIZE) {
		return `${name[0]}${MASK}`;
	} else {
		return `${name[0]}${name
			.split('')
			.slice(1, name.length - 1)
			.map(() => '*')
			.join('')}${name[name.length - 1]}`;
	}
};

export const phoneNumberMasker = (phoneNumber: string) => {
	const [startNumbers, midNumbers, endNumbers] = phoneNumber.split('-');

	return `${startNumbers}-${midNumbers
		.split('')
		.map(() => '*')
		.join('')}-${endNumbers}`;
};

export const dateISOStringToFullDay = (dateISOString: string) => {
	return dateISOString?.split('T')[0];
};

export const genderCodeToGender = (genderCode: number) => {
	return MALE_GENDER_CODES.includes(genderCode) ? `남(${genderCode})` : `여(${genderCode})`;
};
