import { Dimensions, StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
	container: {
		borderRadius: border_radius.border_medium,
		overflow: "hidden",
		position: "relative",
	},
	content: {
		backgroundColor: colors.white_100,
		borderRadius: border_radius.border_medium,
		paddingHorizontal: spaces.item_space_min_big,
		paddingVertical: spaces.item_space_simple_med,
		width: width * 0.85,
	},
	close_button: {
		position: "absolute",
		top: spaces.item_space_min_big,
		right: spaces.item_space_min_big,
	},
	title: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.text,
		marginTop: spaces.item_space_tiny_big,
		textAlign: "center",
	},
	list_content: {
		marginTop: spaces.item_space_simple_med,
		gap: spaces.item_space_min_big,
	},
	item_select: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spaces.item_space_min_big,
	},
	text_select: {
		fontFamily: fonts.poppins_medium,
		fontSize: fonts_sizes.text,
		flexShrink: 1,
		textAlign: "center",
	},
	aux_view: {
		width: spaces.item_space_min_big,
	},
	container_empty_state: {
		alignItems: "center",
	},
	text_empty_state: {
		width: "80%",
		fontFamily: fonts.plusJakartaSans_regular,
		fontSize: fonts_sizes.text_small,
		flexShrink: 1,
		textAlign: "center",
	},
});
