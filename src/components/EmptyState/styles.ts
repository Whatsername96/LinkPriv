import { StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	letter_spacings,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: colors.white_50,
		minHeight: spaces.item_space_big,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: border_radius.border_simple,
		paddingVertical: spaces.item_space_min,
		paddingHorizontal: spaces.item_space_simple,
	},
	content: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontFamily: fonts.plusJakartaSans_bold,
		fontSize: fonts_sizes.detail,
		color: colors.black_3_100,
		textAlign: "center",
		flexShrink: 1,
		letterSpacing: letter_spacings.neg_min,
	},
	cta: {
		color: colors.green_1_100,
		textDecorationStyle: "solid",
		textDecorationLine: "underline",
		textDecorationColor: colors.green_1_100,
	},
});
