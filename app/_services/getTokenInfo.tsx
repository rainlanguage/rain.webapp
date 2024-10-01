import { YamlData } from '../_types/yamlData';
import { Address, erc20Abi, isHex } from 'viem';
import { getPublicClient } from './getPublicClient';

export interface TokenInfo {
	decimals: number;
	symbol: string;
	name: string;
	yamlName: string;
	address: Address;
}

export const getTokenInfos = async (yaml: YamlData): Promise<TokenInfo[]> => {
	const tokenInfos = [];

	for (const [tokenName, token] of Object.entries(yaml.tokens)) {
		if (!isHex(token.address))
			throw new Error(`Token address for ${tokenName} is not a hex string: got ${token.address}`);

		if (!token.network) throw new Error(`Token ${tokenName} does not have a network`);

		const tokenContract = {
			address: token.address,
			abi: erc20Abi
		} as const;

		const client = getPublicClient(yaml.networks[token.network]);

		const res = await client.multicall({
			contracts: [
				{
					...tokenContract,
					functionName: 'decimals'
				},
				{
					...tokenContract,
					functionName: 'symbol'
				},
				{
					...tokenContract,
					functionName: 'name'
				}
			]
		});

		if (res.some((r) => r.status !== 'success')) {
			throw new Error(
				`Failed to fetch token info for ${tokenName}: ${res.map((r) => r.error).join(', ')}`
			);
		}

		if (!res[0].result) throw new Error(`Token ${tokenName} has no decimals`);
		if (!res[1].result) throw new Error(`Token ${tokenName} has no symbol`);
		if (!res[2].result) throw new Error(`Token ${tokenName} has no name`);

		tokenInfos.push({
			yamlName: tokenName,
			address: token.address,
			decimals: res[0].result,
			symbol: res[1].result,
			name: res[2].result
		});
	}
	return tokenInfos;
};
