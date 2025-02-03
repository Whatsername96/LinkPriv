import { useEffect, useCallback, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";

type UseStateHook<T> = [T | null, (value: T | null) => void];

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
		setIsLoadingStorage(true);

		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	} catch (e) {
		console.error("Error saving data to SecureStore:", e);
	} finally {
		setIsLoadingStorage(false);
	}
}

export function useStorageState(
	key: string
): [string | null, (value: string | null) => void, boolean] {
	const [state, setState] = useAsyncState<string | null>(null);
	const [isLoadingStorage, setIsLoadingStorage] = useState(true);

	useEffect(() => {
		const loadStorageData = async () => {
			setIsLoadingStorage(true);
			try {
				const value = await SecureStore.getItemAsync(key);
				setState(value);
			} catch (e) {
				console.error("Error loading data from SecureStore:", e);
			} finally {
				setIsLoadingStorage(false);
			}
		};

		loadStorageData();
	}, [key]);

	const setValue = useCallback(
		(value: string | null) => {
			setState(value);
			setStorageItemAsync(key, value, setIsLoadingStorage);
		},
		[key]
	);

	return [state, setValue, isLoadingStorage];
}
