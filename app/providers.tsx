'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { SupportedChainsList } from './_types/chains';

export const config = getDefaultConfig({
	appName: 'RainFrame',
	projectId: 'ba29a4b0642a94fd4dbc754841c2decb',
	chains: SupportedChainsList,
	ssr: true // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const customTheme: CustomFlowbiteTheme = {
	button: {
		color: {
			primary: 'bg-cyan-600 hover:bg-cyan-700 text-white font-semibold'
		},
		size: {
			sm: 'px-3 py-[0.39em] text-md'
		}
	}
};

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Flowbite theme={{ theme: customTheme }}>
			<WagmiProvider config={config}>
				<QueryClientProvider client={queryClient}>
					<RainbowKitProvider
						theme={lightTheme({
							accentColor: 'rgb(30, 101, 242)'
						})}>
						{children}
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</Flowbite>
	);
}
