import { SupportedChains } from '../_types/chains';

export const getOrderChainByName = (network: string) => {
	return SupportedChains[network as keyof typeof SupportedChains] || null;
};
