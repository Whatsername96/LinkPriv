import { api } from "@/api/axiosConfig";

const LAST_TRANSACTIONS_URL = "/Mobiles/last-transactions";
const TRANSACTIONS_URL = "/Mobiles/transactions";

export async function getLastTransactionsService() {
	const res = await api.get(LAST_TRANSACTIONS_URL);
	return res.data;
}

export async function getTransactionsService(page: number, pageSize: number) {
	const res = await api.get(
		`${TRANSACTIONS_URL}?page=${page}&pageSize=${pageSize}`
	);
	return res.data;
}
