import { border, colors, spaces } from "@/constants/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		paddingVertical: spaces.item_space_min_big,
		paddingHorizontal: spaces.item_space_simple_med,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spaces.item_space_simple,
		backgroundColor: colors.white_100,
	},
	container_items: {
		width: spaces.item_space_plus_med,
		height: spaces.item_space_plus_med,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: spaces.item_space_plus_med / 2,
		overflow: "hidden",
	},
	marker_ball: {
		backgroundColor: colors.pink_2_100,
		position: "absolute",
	},
	marker_ball_image: {
		width: spaces.item_space_extra_min,
		height: spaces.item_space_extra_min,
		borderRadius: spaces.item_space_extra_min / 2,
		right: 0,
		top: 0,
		borderWidth: border.border_medium,
		borderColor: colors.white_100,
		overflow: "hidden",
	},
	container_notifications: {
		backgroundColor: colors.gray_2_25,
		borderRadius: spaces.item_space_plus_med / 2,
		overflow: "hidden",
	},
	marker_ball_notifications: {
		width: spaces.item_space_extra_small,
		height: spaces.item_space_extra_small,
		borderRadius: spaces.item_space_extra_small / 2,
		top: spaces.item_space_min,
		right: spaces.item_space_extra_min,
		overflow: "hidden",
	},
});
