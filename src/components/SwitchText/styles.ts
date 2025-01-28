import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: spaces.item_space_extra_min,
	},
	text: {
		fontFamily: fonts.plusJakaartaSans_medium,
		fontSize: fonts_sizes.text_small,
		color: colors.gray_12_100,
		flexShrink: 1,
	},
});
