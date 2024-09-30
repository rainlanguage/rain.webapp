export type Button = {
	buttonTarget: string;
	buttonValue: string;
	buttonText: string;
};

export type PaginatedButton = {
	buttonTarget: string;
	buttonValue: string;
	buttonText: string;
	buttonPage: number;
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

export interface Output {
	token: Token;
	balance: bigint;
	vaultId: bigint;
}

export interface Input {
	token: Token;
	balance: bigint;
	vaultId: bigint;
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
