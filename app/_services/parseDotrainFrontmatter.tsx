import { pad, toBytes, toHex } from 'viem';
import { YamlData } from '../_types/yamlData';
import _ from 'lodash';

export const getOrderDetailsGivenDeployment = (yamlData: YamlData, deploymentOption: string) => {
	const deployment = yamlData.deployments[deploymentOption];
	const order = yamlData.orders[deployment.order];
	const orderBook = yamlData.orderbooks[order.orderbook];
	const orderBookAddress = toHex(pad(toBytes(BigInt(orderBook.address)), { size: 20 }));
	const network = yamlData.networks[order.network];

	const tokens = yamlData.tokens;

	const fullScenarioPath = deployment.scenario
		.split('.')
		.map((scenario, index, array) =>
			index === array.length - 1 ? scenario : scenario + '.scenarios'
		)
		.join('.');
	const scenario = _.get(yamlData.scenarios, fullScenarioPath);

	return {
		deployment,
		order,
		orderBook,
		orderBookAddress,
		network,
		tokens,
		scenario
	};
};
