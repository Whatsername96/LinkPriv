import { StyleSheet } from "react-native";
import { colors, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	tabBar: {
		flexDirection: "row",
		backgroundColor: colors.white_100,
		justifyContent: "space-around",
		paddingHorizontal: spaces.item_space_simple,
		paddingVertical: spaces.item_space_med,
		gap: spaces.item_space_simple,
	},
	tabItem: {
		justifyContent: "center",
		alignItems: "center",
		height: spaces.item_space_simple_med,
		width: spaces.item_space_simple_med,
	},
});
