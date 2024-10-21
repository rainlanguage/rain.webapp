export const handleDecimalSeparator = (e: React.ChangeEvent<HTMLInputElement>): string => {
	const value = e.target.value;
	const sanitizedValue = value.replace(/[,.]/, '.').replace(/\.(?=.*\.)/g, '');
	const finalValue = sanitizedValue.replace(/[^\d.]/g, '');
	return finalValue;
};
