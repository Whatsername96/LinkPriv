import { StyleSheet } from "react-native";
import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	text_error: {
		fontFamily: fonts.plusJakartaSans_regular,
		fontSize: fonts_sizes.small,
		color: colors.red_1_100,
		marginTop: spaces.item_space_tiny,
	},
});
