import { useState } from "react";
import Toast from "react-native-toast-message";

import {
	BankAccountsWithdrawParams,
	postBankAccountsWithdrawService,
} from "@/services/bankAccounts/bankAccounts.service";

import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "O valor do saque precisa ser pelo menos R$ 10,00.",
};

export function usePostBankAccountWithdraw() {
	const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
	const [successWithdraw, setSuccessWithdraw] = useState(false);

	async function postBankAccountsWithdraw(params: BankAccountsWithdrawParams) {
		try {
			setIsLoadingWithdraw(true);
			setSuccessWithdraw(false);
			const res = await postBankAccountsWithdrawService(params);
			Toast.show({
				type: "success",
				text1: "Saque",
				text2: "Saque realizado!",
				visibilityTime: 3000,
			});
			setSuccessWithdraw(true);
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
					text1: "Ocorreu um erro ao realizar o saque.",
					visibilityTime: 3000,
				});
			}
		} finally {
			setIsLoadingWithdraw(false);
		}
	}

	return {
		postBankAccountsWithdraw,
		isLoadingWithdraw,
		successWithdraw,
	};
}
