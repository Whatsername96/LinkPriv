import { StyleSheet } from "react-native";
import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		gap: spaces.item_space_min_big,
		alignItems: "center",
	},
	title: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.text_med,
		lineHeight: fonts_sizes.text_med * 1.5,
		color: colors.gray_12_100,
	},
});
