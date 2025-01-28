import { useState } from "react";
import Toast from "react-native-toast-message";

import { getChartInfoService } from "@/services/chartInfo/chartInfo.service";

import { ChartInfoResponse } from "@/types/backend";
import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "Credenciais inválidas.",
};

export function useGetChartInfo() {
	const [isLoadingChartInfo, setIsLoadingIsLoadingChartInfo] = useState(false);
	const [listChartInfo, setListChartInfo] = useState<ChartInfoResponse>({
		availableAmount: 0,
		chart: [],
		paidAmount: 0,
		transferredAmount: 0,
	});

	async function getChartInfo() {
		try {
			setIsLoadingIsLoadingChartInfo(true);
			const res = await getChartInfoService();
			setListChartInfo(res as ChartInfoResponse);
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
			setIsLoadingIsLoadingChartInfo(false);
		}
	}

	return { isLoadingChartInfo, listChartInfo, getChartInfo };
}
