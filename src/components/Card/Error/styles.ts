import { StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spaces.item_space_min,
		paddingVertical: spaces.item_space_small,
		backgroundColor: colors.red_light_1_25,
		borderWidth: spaces.item_space_tiny_med,
		borderColor: colors.red_light_1_50,
		borderRadius: border_radius.border_simple,
		overflow: "hidden",
	},
	text: {
		fontFamily: fonts.plusJakartaSans_regular,
		fontSize: fonts_sizes.text_small,
		color: colors.red_1_100,
	},
});
