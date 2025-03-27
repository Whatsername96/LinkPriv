import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useTestConnectionUser() {
	const [isConnected, setIsConnected] = useState(true);
	const [isLoadingConnectionStatus, setIsLoadingConnectionStatus] =
		useState(true);

	useEffect(() => {
		testConnectionApp();
	}, []);

	function timeout(milliseconds: number) {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	}

	async function testConnectionApp() {
		try {
			setIsLoadingConnectionStatus(true);
			const netInfoFirst = await NetInfo.fetch();
			if (netInfoFirst.isInternetReachable) {
				setIsConnected(
					netInfoFirst.isConnected && netInfoFirst.isInternetReachable
						? netInfoFirst.isConnected && netInfoFirst.isInternetReachable
						: false
				);
			} else {
				await timeout(1000);
				const netInfoSecond = await NetInfo.fetch();
				setIsConnected(
					netInfoSecond.isConnected && netInfoSecond.isInternetReachable
						? netInfoSecond.isConnected && netInfoSecond.isInternetReachable
						: false
				);
			}
		} catch (e) {
			console.error("Erro ao verificar conexão:", e);
		} finally {
			setIsLoadingConnectionStatus(false);
		}
	}

	return { isConnected, isLoadingConnectionStatus, testConnectionApp };
}
