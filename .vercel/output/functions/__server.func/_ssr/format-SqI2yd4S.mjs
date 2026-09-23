//#region node_modules/.nitro/vite/services/ssr/assets/format-SqI2yd4S.js
function formatPrice(amount) {
	return `${amount.toLocaleString("fr-DZ")} DA`;
}
function isValidPhone(value) {
	const digits = value.replace(/\D/g, "");
	return digits.length >= 8 && digits.length <= 15;
}
//#endregion
export { isValidPhone as n, formatPrice as t };
