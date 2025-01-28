import { StyleSheet } from "react-native";
import { colors, fonts, fonts_sizes, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white_100,
	},
	container_empty_state: {
		paddingHorizontal: spaces.item_space_med,
	},
	container_end: {
		width: "100%",
		paddingHorizontal: spaces.item_space_med,
	},
	text_end: {
		fontFamily: fonts.sofiapro_regular,
		fontSize: fonts_sizes.small,
		textAlign: "center",
	},
});
