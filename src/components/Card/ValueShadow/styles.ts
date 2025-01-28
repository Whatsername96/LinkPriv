import { StyleSheet, Dimensions } from "react-native";
import { border_radius, fonts, fonts_sizes, spaces } from "@/constants/styles";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
	container: {
		borderRadius: border_radius.border_medium,
		overflow: "hidden",
	},
	content: {
		minWidth:
			(width - 2 * spaces.item_space_med - 2 * spaces.item_space_min) / 3,
		paddingVertical: spaces.item_space_simple,
		paddingHorizontal: spaces.item_space_small,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	},
	text: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.text,

		lineHeight: fonts_sizes.text * 1.5,
		textAlign: "center",
	},
});
