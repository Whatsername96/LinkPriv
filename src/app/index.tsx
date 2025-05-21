import { useEffect } from "react";
import { Redirect } from "expo-router";

import { useAuth } from "@/contexts/useAuth";
import { useLoader } from "@/contexts/LoaderProvider";

export default function AppLayout() {
  const { isLoadingSession, isLoadingStorage, session } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (isLoadingSession || isLoadingStorage) {
      showLoader();
    } else {
      hideLoader()
    }
  }, [isLoadingSession, isLoadingStorage]);

  if (!session && !isLoadingSession && !isLoadingStorage) {
    return <Redirect href="/login" />;
  }

  if (session && !isLoadingSession && !isLoadingStorage) {
    return (
      <Redirect href="/(tabs)" />
    );
  }

  return <></>;
}
