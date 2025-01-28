import { StyleSheet } from "react-native";
import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spaces.item_space_med,
	},
	date: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.small,
		color: colors.gray_4_100,
		marginBottom: spaces.item_space_extra_small,
	},
	content: {
		gap: spaces.item_space_extra_min,
	},
	divisor: {
		height: spaces.item_space_extra_tiny,
		width: "100%",
		backgroundColor: colors.gray_6_100,
		marginVertical: spaces.item_space_simple,
	},
});
