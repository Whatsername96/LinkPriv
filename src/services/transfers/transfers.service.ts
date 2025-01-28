import { api } from "@/api/axiosConfig";

const TRANSFERS_URL = "/Mobiles/transfers";

export async function getTransfersService(page: number, pageSize: number) {
	const res = await api.get(
		`${TRANSFERS_URL}?page=${page}&pageSize=${pageSize}`
	);
	return res.data;
}
