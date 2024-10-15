import { describe, it, expect, vi } from 'vitest';
import { formatTimestampSecondsAsLocal } from '@/app/_services/dates';

const createTimestamp = (dateString: string) => BigInt(Date.parse(dateString) / 1000);

describe('formatTimestampSecondsAsLocal', () => {
	it('formats a timestamp correctly based on default locale', () => {
		const timestamp = createTimestamp('2024-10-01T14:36:15+00:00');
		const result = formatTimestampSecondsAsLocal(timestamp);

		expect(result).toBeTruthy();
		expect(result).toMatch(/2024/);
	});

	it('formats the date correctly in en-GB locale', () => {
		vi.stubGlobal('navigator', { language: 'en-GB' });

		const timestamp = createTimestamp('2024-10-01T14:36:15+00:00');
		const result = formatTimestampSecondsAsLocal(timestamp);

		expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
	});

	it('formats the date correctly in de-DE locale', () => {
		vi.stubGlobal('navigator', { language: 'de-DE' });

		const timestamp = createTimestamp('2024-10-01T14:36:15+00:00');
		const result = formatTimestampSecondsAsLocal(timestamp);

		expect(result).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/);
	});

	it('formats the date correctly in en-US locale', () => {
		vi.stubGlobal('navigator', { language: 'en-US' });

		const timestamp = createTimestamp('2024-10-01T14:36:15+00:00');
		const result = formatTimestampSecondsAsLocal(timestamp);

		expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});
});
