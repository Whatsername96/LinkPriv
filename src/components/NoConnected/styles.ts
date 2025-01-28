import { StyleSheet } from "react-native";
import {
	colors,
	fonts,
	fonts_sizes,
	letter_spacings,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spaces.item_space_simple_med,
		justifyContent: "center",
		gap: spaces.item_space_min,
	},
	container_image: {
		alignItems: "center",
	},
	info: {
		fontFamily: fonts.poppins_medium,
		fontSize: fonts_sizes.text_small,
		color: colors.black_2_100,
		lineHeight: fonts_sizes.text_small + fonts_sizes.text_small / 2,
		letterSpacing: letter_spacings.neg_min,
		flexShrink: 1,
		textAlign: "center",
	},
});
