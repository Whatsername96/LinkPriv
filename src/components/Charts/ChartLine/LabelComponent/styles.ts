import { StyleSheet } from "react-native";
import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	text: {
		fontFamily: fonts.sofiapro_medium,
		color: colors.pink_2_100,
		fontSize: fonts_sizes.text, // Ajuste o tamanho da fonte se necessário
		textAlign: "center",
		height: spaces.item_space_simple_med,
		width: spaces.item_space_plus_big,
	},
});
