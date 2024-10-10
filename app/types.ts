export type Button = {
	buttonTarget: string;
	buttonValue: string;
	buttonText: string;
	buttonAction?: string;
};

export type PaginatedButton = {
	buttonTarget: string;
	buttonValue: number | string;
	buttonText: string;
	buttonPage: string | string;
	buttonMax: number;
};

export interface Order {
	orderBytes: string;
	orderHash: string;
	owner: string;
	outputs: Output[];
	inputs: Input[];
	orderbook: Orderbook;
	trades: Trade[];
	active: string;
	timestampAdded: string;
	addEvents: AddEvent[];
	network: string;
	subgraphUrl: string;
}

export interface Input {
	orderbook: Orderbook;
	vaultId: bigint;
	token: Token;
	balance: bigint;
}

export interface Output {
	orderbook: Orderbook;
	vaultId: bigint;
	token: Token;
	balance: bigint;
}

export interface Token {
	id: string;
	address: string;
	name: string;
	symbol: string;
	decimals: bigint;
}

export interface Orderbook {
	id: string;
}

export interface Trade {
	id: string;
	tradeEvent: TradeEvent;
	inputVaultBalanceChange: VaultBalanceChange;
	outputVaultBalanceChange: VaultBalanceChange;
}

export interface TradeEvent {
	sender: string;
	transaction: Transaction;
}

export interface VaultBalanceChange {
	amount: bigint;
	vault: Vault;
}
export interface AddEvent {
	transaction: Transaction;
}

export interface Transaction {
	id: string;
	timestamp: string;
	blockNumber: string;
}

export interface Vault {
	token: Token;
}
