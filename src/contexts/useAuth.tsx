import { useContext, createContext, type PropsWithChildren, useState, useEffect } from "react";

import { router } from "expo-router";

import { useStorageState } from "@/services/useStorageState";
import {
  api,
  setupAxiosInterceptorsRequestApi,
  setupAxiosInterceptorsResponseApi
} from "@/api/axiosConfig";

import { CatchError } from "@/types/api";
import { LoginResponse } from "@/types/backend";
import { useOneSignal } from "@/hooks/OneSignal/useOneSignal.hook";

type LoginPayload = {
  email: string;
  password: string;
};

const AuthContext = createContext<{
  signIn: (payload: LoginPayload) => void;
  signOut: () => void;
  session?: LoginResponse | null;
  isLoadingStorage: boolean;
  isLoadingSession: boolean,
  error: string | null,
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoadingSession: false,
  isLoadingStorage: false,
  error: null,
});

const LOGIN_URL = "/Sellers/login";

const ERRORS_STATUS_CODE: { [key: number]: string } = {
  400: "Preencha todos os campos.",
  404: "Credenciais inválidas.",
};

export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession, isLoadingStorage] = useStorageState("linkpriv_session");
  const [error, setError] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);

  useOneSignal(!!session);

  async function signIn(payload: LoginPayload) {
    try {
      setIsLoadingSession(true);
      const { data } = await api.post(LOGIN_URL, payload);
      if (data) {
        setSession(JSON.stringify(data as LoginResponse));
      }
    } catch (e: any) {
      const error = e as CatchError;
      if (error.response) {
        setError(ERRORS_STATUS_CODE[error.response.status])
      } else {
        setError("Erro ao fazer login.");
      }
    } finally {
      setIsLoadingSession(false);
    }
  }

  function signOut() {
    setSession(null);
    setupAxiosInterceptorsRequestApi("");
    router.replace("/login");
  }

  useEffect(() => {
    if (session) {
      setupAxiosInterceptorsRequestApi(JSON.parse(session).authToken);
      router.replace("/(tabs)");
    }
  }, [session]);

  useEffect(() => {
    setupAxiosInterceptorsResponseApi(signOut);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session: session ? JSON.parse(session) as LoginResponse : null,
        isLoadingStorage,
        isLoadingSession,
        error
      }}>
      {children}
    </AuthContext.Provider>
  );
}
