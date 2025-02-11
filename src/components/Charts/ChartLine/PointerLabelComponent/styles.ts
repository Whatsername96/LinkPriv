import { StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container_label: {
		paddingHorizontal: spaces.item_space_small,
		paddingVertical: spaces.item_space_tiny_big,
		borderRadius: border_radius.border_medium,
		backgroundColor: colors.pink_2_100,
		alignItems: "center",
		position: "relative",
		marginTop: 10,
	},
	label: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text_small,
		color: colors.white_100,
		textAlign: "center",
		flexShrink: 1,
	},
	baloon_detail: {
		width: spaces.item_space_min,
		height: spaces.item_space_min,
		backgroundColor: colors.pink_2_100,
		alignSelf: "center",
		position: "absolute",
		bottom: -5,
		transform: [
			{
				rotate: "45deg",
			},
		],
	},
});
