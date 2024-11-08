import { getTokenInfosForDeployment } from '../app/_services/getTokenInfo';
import { getPublicClient } from '../app/_services/getPublicClient';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { yamlDataFixture } from '../__fixtures__/yamlDataFixture';
import { YamlData } from '@/app/_types/yamlData';

// Mock the getPublicClient module
vi.mock('../app/_services/getPublicClient');

describe('getTokenInfosForDeployment', () => {
	// Reset mocks before each test
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('successfully fetches token information', async () => {
		// Mock the multicall response
		const mockMulticall = vi.fn().mockResolvedValue([
			{ status: 'success', result: 18 },
			{ status: 'success', result: 'WETH' },
			{ status: 'success', result: 'Wrapped Ether' }
		]);

		// Mock the public client
		(getPublicClient as ReturnType<typeof vi.fn>).mockReturnValue({
			multicall: mockMulticall
		});

		const result = await getTokenInfosForDeployment(yamlDataFixture, 'base-weth-usdc');

		// Verify the results
		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			yamlName: 'base-weth',
			address: '0x4200000000000000000000000000000000000006',
			decimals: 18,
			symbol: 'WETH',
			name: 'Wrapped Ether'
		});

		// Verify multicall was called correctly
		expect(mockMulticall).toHaveBeenCalledTimes(2); // Once for each token
	});

	it('throws error when token address is not hex', async () => {
		const invalidYamlData: YamlData = {
			...yamlDataFixture,
			tokens: {
				'base-weth': {
					network: 'base',
					address: 'not-a-hex-address',
					decimals: 18
				}
			}
		};

		await expect(getTokenInfosForDeployment(invalidYamlData, 'base-weth-usdc')).rejects.toThrow(
			'Token address for base-weth is not a hex string'
		);
	});

	it('throws error when token network is missing', async () => {
		const invalidYamlData = {
			...yamlDataFixture,
			tokens: {
				'base-weth': {
					network: undefined as unknown as string, // Cast to string to satisfy type but simulate missing network
					address: '0x4200000000000000000000000000000000000006',
					decimals: 18
				}
			}
		} as YamlData;

		await expect(getTokenInfosForDeployment(invalidYamlData, 'base-weth-usdc')).rejects.toThrow(
			'Token base-weth does not have a network'
		);
	});
});
