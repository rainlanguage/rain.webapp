import { Hex } from 'viem';

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
	network: string;
	subgraph: string;
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
	[key: string]: number | Hex;
}

interface Scenario {
	deployer?: string;
	runs?: number;
	bindings: ScenarioBinding;
	orderbook?: string;
	scenarios?: { [key: string]: Scenario };
}

interface Deployment {
	scenario: string;
	order: string;
}

export interface YamlData {
	'raindex-version'?: string;
	networks: { [key: string]: Network };
	subgraphs: { [key: string]: string };
	metaboards: { [key: string]: string };
	orderbooks: { [key: string]: Orderbook };
	deployers: { [key: string]: Deployer };
	tokens: { [key: string]: Token };
	orders: { [key: string]: Order };
	scenarios: { [key: string]: Scenario };
	deployments: { [key: string]: Deployment };
	gui: Gui;
}
