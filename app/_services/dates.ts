import dayjs from 'dayjs';
import bigIntSupport from 'dayjs/plugin/bigIntSupport';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(bigIntSupport);
dayjs.extend(localizedFormat);

export function formatTimestampSecondsAsLocal(timestampSeconds: bigint) {
	const date = dayjs(timestampSeconds * BigInt('1000'));
	return date.toDate().toLocaleString(navigator.language || undefined, {});
}
