import { getAddOrderCalldata } from '@rainlanguage/orderbook/common';
import { decodeFunctionData, encodeFunctionData, getAddress, parseUnits, toHex } from 'viem';
import { FrameState } from '../_types/frame';
import { orderBookJson } from '@/public/_abis/OrderBook';
import { TokenDeposit } from '../_components/SubmissionModal';

interface DecodedAddOrderCallData {
	args?: {
		validOutputs?: {
			vaultId: string;
			token: string;
		}[];
	}[];
}

export const getSubmissionTransactionData = async (
	currentState: FrameState,
	dotrainText: string,
	tokenDeposits: TokenDeposit[]
) => {
	console.log('1, getting submission tx data');
	const addOrderCalldata = await getAddOrderCalldata(
		dotrainText,
		currentState.deploymentOption?.deployment || ''
	);
	console.log('2, call data order added');

	// Get the vault ids from the decoded calldata
	const decodedAddOrderCalldata = decodeFunctionData({
		data: toHex(addOrderCalldata),
		abi: orderBookJson.abi
	}) as DecodedAddOrderCallData;
	console.log('3, call data order decoded');

	const depositCalldatas = tokenDeposits.map((tokenDeposit) => {
		const depositAmount = parseUnits(String(tokenDeposit.amount), tokenDeposit.tokenInfo.decimals);

		const vaultId = decodedAddOrderCalldata.args?.[0]?.validOutputs?.find(
			(io) => getAddress(io.token) === getAddress(tokenDeposit.tokenInfo.address)
		)?.vaultId;

		if (!vaultId) {
			throw new Error('Vault id not found');
		}
		console.log('4, encoding fn data');
		return encodeFunctionData({
			functionName: 'deposit2',
			abi: orderBookJson.abi,
			args: [tokenDeposit.tokenInfo.address, toHex(vaultId), depositAmount, []]
		});
	});

	return {
		addOrderCalldata: toHex(addOrderCalldata),
		depositCalldatas
	};
};
