import { StyleSheet } from "react-native";
import {
	border,
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container_select: {
		padding: spaces.item_space_extra_min,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: border_radius.border_medium,
		borderWidth: border.border_simple,
		borderColor: colors.gray_7_100,
		gap: spaces.item_space_extra_min,
	},
	text: {
		fontFamily: fonts.poppins_medium,
		fontSize: fonts_sizes.text_small,
		lineHeight: fonts_sizes.text_small * 1.5,
		flexShrink: 1,
	},
});
