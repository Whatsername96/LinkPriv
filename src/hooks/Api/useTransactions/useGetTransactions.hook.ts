import { useState } from "react";
import Toast from "react-native-toast-message";

import { getTransactionsService } from "@/services/transactions/transactions.service";

import { TransactionByDateResponse } from "@/types/backend";
import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "Ocorreu um erro ao listar os saques.",
};

export function useGetTransactions() {
	const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
	const [listTransactions, setListTransactions] = useState<
		TransactionByDateResponse[]
	>([]);

	async function getTransactionsPaginated(page: number, pageSize: number) {
		try {
			setIsLoadingTransactions(true);
			const res = await getTransactionsService(page, pageSize);
			setListTransactions(res as TransactionByDateResponse[]);
		} catch (e) {
			const error = e as CatchError;
			if (error.response) {
				Toast.show({
					type: "error",
					text1: ERRORS_STATUS_CODE[error.response.status],
					visibilityTime: 3000,
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Ocorreu um erro ao listar as transações",
					visibilityTime: 3000,
				});
			}
		} finally {
			setIsLoadingTransactions(false);
		}
	}
	return { isLoadingTransactions, listTransactions, getTransactionsPaginated };
}
