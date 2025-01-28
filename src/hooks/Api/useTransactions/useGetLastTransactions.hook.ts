import { useState } from "react";
import Toast from "react-native-toast-message";

import { getLastTransactionsService } from "@/services/transactions/transactions.service";

import { LastTransactionResponse, TransactionStatus } from "@/types/backend";
import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "Ocorreu um erro ao listar as transações.",
};

export function useGetLastTransactions() {
	const [isLoadingLastTransactions, setIsLoadingLastTransactions] =
		useState(false);
	const [listLastTransactions, setListLastTransactions] = useState<
		LastTransactionResponse[]
	>([
		{
			dateCreated: "2025-01-15T22:30:00",
			buyerName: "",
			buyerEmail: "",
			sellerAmount: 0,
			productName: "Título",
			status: TransactionStatus.WaitingPayment,
			isReferal: false,
			tag: 0,
			giftMessage: "",
			publicAccessId: "4",
		},
		{
			dateCreated: "2025-01-14T22:30:00",
			buyerName: "",
			buyerEmail: "",
			sellerAmount: 0,
			productName: "Título",
			status: TransactionStatus.WaitingPayment,
			isReferal: false,
			tag: 0,
			giftMessage: "",
			publicAccessId: "3",
		},
		{
			dateCreated: "2025-01-13T22:30:00",
			buyerName: "",
			buyerEmail: "",
			sellerAmount: 0,
			productName: "Título",
			status: TransactionStatus.WaitingPayment,
			isReferal: false,
			tag: 0,
			giftMessage: "",
			publicAccessId: "2",
		},
		{
			dateCreated: "2025-01-12T22:30:00",
			buyerName: "",
			buyerEmail: "",
			sellerAmount: 0,
			productName: "Título",
			status: TransactionStatus.WaitingPayment,
			isReferal: false,
			tag: 0,
			giftMessage: "",
			publicAccessId: "1",
		},
	]);

	async function getLastTransactions() {
		try {
			setIsLoadingLastTransactions(true);
			const res = await getLastTransactionsService();
			setListLastTransactions(res as LastTransactionResponse[]);
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
					text1: "Ocorreu um erro ao obter as configurações",
					visibilityTime: 3000,
				});
			}
		} finally {
			setIsLoadingLastTransactions(false);
		}
	}
	return {
		isLoadingLastTransactions,
		listLastTransactions,
		getLastTransactions,
	};
}
