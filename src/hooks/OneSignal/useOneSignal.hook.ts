import { useEffect, useState } from "react";
import { LogLevel, OneSignal } from "react-native-onesignal";
import { appConfig } from "@/api/appConfig";

export function useOneSignal(isLoggedIn: boolean) {
	const [isSubscribed, setIsSubscribed] = useState(false);

	async function getDeviceState() {
		const deviceState = await OneSignal.User.pushSubscription.getOptedInAsync();
		console.log("Device State:", deviceState);
		setIsSubscribed(deviceState);
	}

	useEffect(() => {
		OneSignal.Debug.setLogLevel(LogLevel.Verbose);
		OneSignal.setConsentRequired(false);
		OneSignal.Notifications.requestPermission(true);
		OneSignal.initialize(appConfig.oneSignalKey);

		OneSignal.Notifications.addEventListener(
			"foregroundWillDisplay",
			(event) => {
				console.log("OneSignal: notification will display", event.notification);
			}
		);

		OneSignal.Notifications.addEventListener("click", (event) => {
			console.log(event.result);
		});

		OneSignal.Notifications.addEventListener("permissionChange", (event) => {
			console.log(event);
		});

		OneSignal.User.addEventListener("change", (event) => {
			console.log(event);
		});

		if (isLoggedIn) {
			OneSignal.User.pushSubscription.optIn();
		} else {
			OneSignal.User.pushSubscription.optOut();
		}

		getDeviceState();
	}, [isLoggedIn]);

	return isSubscribed;
}
