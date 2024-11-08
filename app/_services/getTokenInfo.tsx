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

export const getTokenInfosForDeployment = async (
	yaml: YamlData,
	deployment: string
): Promise<TokenInfo[]> => {
	const tokenInfos = [];

	// get the order for the deployment
	const order = yaml.orders[deployment];
	// get the inputs and outputs of the order
	const inputs = order.inputs;
	const outputs = order.outputs;

	// push those to a set to avoid duplicates
	const tokenNames = new Set([...inputs, ...outputs].map((input) => input.token));

	// create a new object with the tokens
	const tokens = Object.fromEntries(
		Array.from(tokenNames).map((tokenName) => [tokenName, yaml.tokens[tokenName]])
	);

	for (const [tokenName, token] of Object.entries(tokens)) {
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
