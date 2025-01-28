import { api } from "@/api/axiosConfig";

const BANK_ACCOUNTS_URL = "/BankAccounts";
const BANK_ACCOUNTS_WITHDRAW_URL = "/BankAccounts/withdraw";

export type BankAccountsWithdrawParams = {
	amount: number;
	bankAccountId: number;
	captchaToken: string;
};

export async function getBankAccountsService() {
	const res = await api.get(BANK_ACCOUNTS_URL);
	return res.data;
}

export async function postBankAccountsWithdrawService(
	params: BankAccountsWithdrawParams
) {
	const res = await api.post(BANK_ACCOUNTS_WITHDRAW_URL, params);
	return res.data;
}
