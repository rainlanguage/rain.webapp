export function formatTimestampSecondsAsLocal(timestampSeconds: bigint) {
	return new Date(Number(timestampSeconds) * 1000).toLocaleString();
}
