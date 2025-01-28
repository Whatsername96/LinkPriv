import { useState } from "react";
import Toast from "react-native-toast-message";

import { getTransfersService } from "@/services/transfers/transfers.service";

import { TransfersResponse } from "@/types/backend";
import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "Ocorreu um erro ao listar os saques.",
};

export function useGetTransfers() {
	const [isLoadingTransfers, setIsLoadingTransfers] = useState(false);
	const [listTransfers, setListTransfers] = useState<TransfersResponse>({
		availableAmount: 0,
		bankAccounts: [],
		transferFee: 0,
		transfers: [],
	});

	async function getTransfersPaginated(page: number, pageSize: number) {
		try {
			setIsLoadingTransfers(true);
			const res = await getTransfersService(page, pageSize);
			setListTransfers(res as TransfersResponse);
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
					text1: "Ocorreu um erro ao listar os saques.",
					visibilityTime: 3000,
				});
			}
		} finally {
			setIsLoadingTransfers(false);
		}
	}
	return { isLoadingTransfers, listTransfers, getTransfersPaginated };
}
