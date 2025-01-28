import { useState } from "react";
import Toast from "react-native-toast-message";

import {
	ConfigureServiceParams,
	putConfigureService,
} from "@/services/configure/configure.service";

import { CatchError } from "@/types/api";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
	401: "Logue-se novamente.",
	400: "Ocorreu um erro ao atualizar as preferências de notificação.",
};

export function usePutConfigure() {
	const [isLoadingUpdateConfigure, setIsLoadingUpdateConfigure] =
		useState(false);

	async function putConfigure(params: ConfigureServiceParams) {
		try {
			setIsLoadingUpdateConfigure(true);
			const res = await putConfigureService(params);
			Toast.show({
				type: "success",
				text1: "Notificações",
				text2: "As preferências de notificação foram atualizadas!",
				visibilityTime: 3000,
			});
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
					text1:
						"Ocorreu um erro ao atualizar as preferências de notificações.",
					visibilityTime: 3000,
				});
			}
		} finally {
			setIsLoadingUpdateConfigure(false);
		}
	}

	return {
		putConfigure,
		isLoadingUpdateConfigure,
	};
}
