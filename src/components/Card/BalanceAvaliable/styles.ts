import { StyleSheet } from "react-native";
import {
	border_radius,
	fonts,
	fonts_sizes,
	letter_spacings,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: spaces.item_space_simple_med,
		paddingHorizontal: spaces.item_space_min,
		borderRadius: border_radius.border_simple,
	},
	content: {
		flexDirection: "column",
		gap: spaces.item_space_small,
	},
	title: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text_small,
		marginBottom: spaces.item_space_tiny_med,
		textAlign: "center",
	},
	container_price: {
		flexDirection: "row",
		alignItems: "flex-end",
	},
	text_price_full: {
		textAlign: "center",
		flexShrink: 1,
	},
	brl: {
		flexShrink: 1,
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text_med,
		letterSpacing: letter_spacings.med,
	},
	trunc: {
		flexShrink: 1,
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.text_med,
		letterSpacing: letter_spacings.med,
	},
	decimal: {
		flexShrink: 1,
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.detail,
		letterSpacing: letter_spacings.med,
	},
	button_right_shadow: {
		width: "100%",
		borderRadius: border_radius.border_medium,
		overflow: "hidden",
	},
	button_right: {
		paddingVertical: spaces.item_space_tiny,
		paddingHorizontal: spaces.item_space_min,
		borderRadius: border_radius.border_medium,
		overflow: "hidden",
	},
	button_right_text: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text,
		letterSpacing: letter_spacings.min,
		flexShrink: 1,
		textAlign: "center",
	},
	info_withdraw: {
		fontFamily: fonts.plusJakartaSans_regular,
		fontSize: fonts_sizes.detail,
		marginTop: spaces.item_space_small,
		flexShrink: 1,
		textAlign: "center",
	},
});
