
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useTestConnectionUser() {
  const [isConnected, setIsConnected] = useState(true);
  const [isLoadingConnectionStatus, setIsLoadingConnectionStatus] = useState(true);

  useEffect(() => {
    testConnectionApp();
  }, []);

  async function testConnectionApp() {
    try {
      setIsLoadingConnectionStatus(true);
      const netInfo = await NetInfo.fetch();
      setIsConnected(
        netInfo.isConnected &&
          netInfo.isInternetReachable ?
          netInfo.isConnected &&
          netInfo.isInternetReachable
          : false);
    } catch (e) {
      console.error("Erro ao verificar conexão:", e);
    } finally {
      setIsLoadingConnectionStatus(false);
    }
  }

  return { isConnected, isLoadingConnectionStatus, testConnectionApp }
}
