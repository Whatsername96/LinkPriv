import { useEffect, useState } from "react";
import {
	LogLevel,
	OneSignal,
	OSNotificationPermission,
} from "react-native-onesignal";
import { appConfig } from "@/api/appConfig";
import { LoginResponse } from "@/types/backend";
import { Platform } from "react-native";

export function useOneSignal(session: string | null) {
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isAbleToNotifications, setIsAbleToNotifications] = useState(false);

	async function getDeviceState() {
		const deviceState = await OneSignal.User.pushSubscription.getOptedInAsync();
		// console.log("Device State:", deviceState);

		setIsSubscribed(deviceState);
	}

	async function getPermission() {
		try {
			let permission = false;

			if (Platform.OS === "ios") {
				const iosPermission = await OneSignal.Notifications.permissionNative();

				if (iosPermission === OSNotificationPermission.Authorized) {
					permission = true;
				} else if (iosPermission === OSNotificationPermission.NotDetermined) {
					permission = await OneSignal.Notifications.requestPermission(false);
				}
			} else {
				permission = await OneSignal.Notifications.requestPermission(false);
			}

			setIsAbleToNotifications(permission);
		} catch (e: any) {
			console.log(e.message);
			setIsAbleToNotifications(false);
		}
	}

	useEffect(() => {
		if (isAbleToNotifications) {
			if (session) {
				const data: LoginResponse = JSON.parse(session);
				OneSignal.User.pushSubscription.optIn();
				OneSignal.login(data.email);
			} else {
				//OneSignal.logout();
				OneSignal.User.pushSubscription.optOut();
			}
		}
	}, [isAbleToNotifications, session]);

	useEffect(() => {
		OneSignal.setConsentRequired(false);
		OneSignal.initialize(appConfig.oneSignalKey);
		// OneSignal.Debug.setLogLevel(LogLevel.Verbose);

		// OneSignal.Notifications.addEventListener(
		// 	"foregroundWillDisplay",
		// 	(event) => {
		// 		console.log("OneSignal: notification will display", event.notification);
		// 	}
		// );

		// OneSignal.Notifications.addEventListener("click", (event) => {
		// 	console.log(event.result);
		// });

		// OneSignal.Notifications.addEventListener("permissionChange", (event) => {
		// 	console.log(event);
		// });

		// OneSignal.User.addEventListener("change", (event) => {
		// 	console.log(event);
		// });
		getDeviceState();
		getPermission();
	}, []);

	return isSubscribed;
}
