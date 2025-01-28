import { StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.pink_2_100,
		borderRadius: border_radius.border_medium,
		overflow: "hidden",
	},
	gradient_bg: {
		padding: spaces.item_space_extra_min,
	},
	text: {
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.text,
		color: colors.white_100,
		textAlign: "center",
		flexShrink: 1,
	},
	container_loading: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});
