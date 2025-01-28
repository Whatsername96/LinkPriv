import { StyleSheet } from "react-native";
import { colors, fonts, fonts_sizes } from "@/constants/styles";

export const styles = StyleSheet.create({
	text: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text,
		color: colors.gray_2_100,
		flexShrink: 1,
	},
});
