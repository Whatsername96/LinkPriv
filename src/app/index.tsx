import { Redirect } from "expo-router";

import { useAuth } from "@/contexts/useAuth";
import { LoaderFull } from "@/components";

export default function AppLayout() {
  const { isLoadingSession, isLoadingStorage, session } = useAuth();

  if (isLoadingSession || isLoadingStorage) {
    return <LoaderFull isVisible={isLoadingSession || isLoadingStorage} />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Redirect href="/(tabs)" />
  );
}
