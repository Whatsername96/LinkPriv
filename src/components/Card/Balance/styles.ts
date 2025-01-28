import { StyleSheet } from "react-native";
import { border_radius, fonts, fonts_sizes, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: spaces.item_space_simple_med,
		paddingHorizontal: spaces.item_space_min,
		borderRadius: border_radius.border_simple,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spaces.item_space_small,
	},
	title: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text_small,
		marginBottom: spaces.item_space_tiny_med,
	},
	container_price: {
		flexDirection: "row",
		alignItems: "flex-end",
	},
	text_price_full: {
		flexShrink: 1,
	},
	brl: {
		flexShrink: 1,
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text,
	},
	trunc: {
		flexShrink: 1,
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.text,
	},
	decimal: {
		flexShrink: 1,
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.detail,
	},
	container_icon: {
		width: spaces.item_space_med,
		height: spaces.item_space_med,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: border_radius.border_simple,
		overflow: "hidden",
	},
	content_group: {
		flex: 1,
	},
});
