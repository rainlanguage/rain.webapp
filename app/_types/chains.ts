import { mainnet, polygon, arbitrum, base, flare, linea } from 'wagmi/chains';

export const SupportedChains = {
	mainnet,
	polygon,
	arbitrum,
	base,
	flare,
	linea
} as const;
export const SupportedChainsList = [mainnet, polygon, arbitrum, base, flare, linea] as const;
