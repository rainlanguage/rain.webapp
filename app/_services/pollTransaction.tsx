import { getTransaction } from '@/app/_queries/getTransaction';

export const pollTransaction = async (
	transactionId: string,
	network: string,
	isResolved: (data: any) => boolean,
	interval = 1000
) => {
	return new Promise<void>((resolve, reject) => {
		const poll = setInterval(async () => {
			try {
				const data = await getTransaction(transactionId, network);
				if (isResolved(data)) {
					clearInterval(poll);
					resolve();
				}
			} catch (error) {
				clearInterval(poll);
				console.error(
					`Error fetching transaction ${transactionId} from network ${network}:`,
					error
				);
				reject(error);
			}
		}, interval);
	});
};
