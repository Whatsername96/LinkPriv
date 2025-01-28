import { useEffect, useCallback, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";

type UseStateHook<T> = [T | null, (value: T | null) => void]; // Retorna o estado e a função de atualização

function useAsyncState<T>(initialValue: T | null = null): UseStateHook<T> {
	return useReducer(
		(state: T | null, action: T | null): T | null => action,
		initialValue
	);
}

export async function setStorageItemAsync(
	key: string,
	value: string | null,
	setIsLoadingStorage: (value: boolean) => void
) {
	try {
		setIsLoadingStorage(true); // Marca como carregando enquanto o valor está sendo salvo

		if (value == null) {
			await SecureStore.deleteItemAsync(key); // Remove o item do SecureStore
		} else {
			await SecureStore.setItemAsync(key, value); // Salva o item no SecureStore
		}
	} catch (e) {
		console.error("Error saving data to SecureStore:", e);
	} finally {
		setIsLoadingStorage(false); // Marca como carregamento concluído
	}
}

export function useStorageState(
	key: string
): [string | null, (value: string | null) => void, boolean] {
	const [state, setState] = useAsyncState<string | null>(null); // Usamos o estado do useAsyncState
	const [isLoadingStorage, setIsLoadingStorage] = useState(true); // Estado de carregamento

	useEffect(() => {
		const loadStorageData = async () => {
			setIsLoadingStorage(true); // Marca como carregando
			try {
				const value = await SecureStore.getItemAsync(key); // Carrega o dado do SecureStore
				setState(value);
			} catch (e) {
				console.error("Error loading data from SecureStore:", e);
			} finally {
				setIsLoadingStorage(false); // Marca como carregado
			}
		};

		loadStorageData(); // Executa a carga quando o efeito é disparado
	}, [key]); // O `key` é uma dependência importante, então se ela mudar, o efeito será executado novamente

	const setValue = useCallback(
		(value: string | null) => {
			setState(value); // Atualiza o estado
			setStorageItemAsync(key, value, setIsLoadingStorage); // Salva no armazenamento e controla o carregamento
		},
		[key] // Dependência do key para garantir que a chave usada no setStorageItemAsync esteja correta
	);

	return [state, setValue, isLoadingStorage]; // Retorna o estado, a função de atualização e o estado de carregamento
}
