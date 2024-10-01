export interface Field {
	binding: string;
	name: string;
	description: string;
	min?: number;
	presets?: Preset[];
}

export interface Preset {
	name: string;
	value: number;
}

export interface Referral {
	name: string;
	url: string;
}

export interface Deposit {
	token: string;
	min?: number;
	presets?: number[];
	referrals?: Referral[];
}

export interface DeploymentOption {
	deployment: string;
	name: string;
	description: string;
	fields: Field[];
	deposit: Deposit;
	deposits: Deposit[];
}

export interface Gui {
	name: string;
	description: string;
	deployments: DeploymentOption[];
}

interface Network {
	rpc: string;
	'chain-id': number;
	'network-id': number;
	currency: string;
}

interface Orderbook {
	address: string;
}

interface Deployer {
	address: string;
	network: string;
}

interface Token {
	network: string;
	address: string;
	decimals: number;
}

interface OrderInputOutput {
	token: string;
	'vault-id': string;
}

interface Order {
	orderbook: string;
	inputs: OrderInputOutput[];
	outputs: OrderInputOutput[];
	network: string;
}

interface ScenarioBinding {
	[key: string]: number;
}

interface Scenario {
	deployer: string;
	runs: number;
	bindings: ScenarioBinding;
}

interface Deployment {
	scenario: string;
	order: string;
}

export interface YamlData {
	networks: { [key: string]: Network };
	subgraphs: { [key: string]: string };
	orderbooks: { [key: string]: Orderbook };
	deployers: { [key: string]: Deployer };
	tokens: { [key: string]: Token };
	orders: { [key: string]: Order };
	scenarios: { [key: string]: Scenario };
	deployments: { [key: string]: Deployment };
	gui: Gui;
}
