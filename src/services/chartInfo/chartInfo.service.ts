import { api } from "@/api/axiosConfig";

const CHART_INFO_URL = "/Mobiles/chart-info";

export async function getChartInfoService(days = 30) {
	const res = await api.get(`${CHART_INFO_URL}?days=${days.toString()}`);
	return res.data;
}
