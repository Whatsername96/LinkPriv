import { useState } from "react";
import Toast from "react-native-toast-message";

import { getConfigureService } from "@/services/configure/configure.service";

import { ConfigureResponse } from "@/types/backend";
import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "Ocorreu um erro ao carregar as opções de notificação.",
};

export function useGetConfigure() {
	const [isLoadingConfigure, setIsLoadingConfigure] = useState(true);
	const [listConfigure, setListConfigure] = useState<ConfigureResponse>({
		notifyApprovedPix: false,
		notifyGeneratedPix: false,
		notifyNews: false,
		notifyTransferredTransfer: false,
	});

	async function getConfigure() {
		try {
			setIsLoadingConfigure(true);
			const res = await getConfigureService();
			setListConfigure(res as ConfigureResponse);
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
			setIsLoadingConfigure(false);
		}
	}

	return {
		getConfigure,
		listConfigure,
		isLoadingConfigure,
	};
}
