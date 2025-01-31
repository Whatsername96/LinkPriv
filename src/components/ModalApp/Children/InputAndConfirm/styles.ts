import { Dimensions, Platform, StyleSheet } from "react-native";
import {
	border,
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
		flexShrink: 1,
	},
	form: {
		marginTop: spaces.item_space_small,
		gap: spaces.item_space_simple,
	},
	input: {
		width: "100%",
		height: 50,
		fontFamily: fonts.plusJakartaSans_regular,
		color: colors.black_1_100,
		lineHeight: Platform.OS === "ios" ? 0 : fonts_sizes.text * 1.5,
		paddingHorizontal: spaces.item_space_min,
		backgroundColor: colors.white_100,
		borderRadius: border_radius.border_medium,
		borderWidth: border.border_simple,
		alignItems: "center",
		fontSize: fonts_sizes.text,
		textAlign: "left",
		overflow: "hidden",
	},
	input_disabled: {
		opacity: 0.5,
	},
	info_withdraw: {
		fontFamily: fonts.plusJakartaSans_regular,
		fontSize: fonts_sizes.detail,
		marginTop: spaces.item_space_small,
		flexShrink: 1,
		textAlign: "center",
	},
	container_description: {
		alignItems: "center",
	},
	description: {
		width: "80%",
		fontFamily: fonts.plusJakartaSans_regular,
		fontSize: fonts_sizes.text_small,
		textAlign: "center",
		flexShrink: 1,
	},
});
