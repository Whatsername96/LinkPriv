import { Platform, StyleSheet } from "react-native";
import {
	border,
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container_input: {
		position: "relative",
	},
	input: {
		width: "100%",
		height: 50,
		fontFamily: fonts.plusJakartaSans_regular,
		color: colors.black_1_100,
		lineHeight: Platform.OS === "ios" ? 0 : fonts_sizes.text * 1.5,
		paddingHorizontal: spaces.item_space_min,
		backgroundColor: colors.white_100,
		borderRadius: border_radius.border_medium,
		borderWidth: border.border_simple,
		alignItems: "center",
		fontSize: fonts_sizes.text,
		textAlign: "left",
		overflow: "hidden",
	},
});
