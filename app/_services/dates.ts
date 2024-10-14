export function formatTimestampSecondsAsLocal(timestampSeconds: bigint, locale?: string) {
	const selectedLocale =
		locale || (typeof navigator !== 'undefined' ? navigator.language : 'en-US');
	return new Date(Number(timestampSeconds) * 1000).toLocaleString(selectedLocale);
}
