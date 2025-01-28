import { StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	letter_spacings,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spaces.item_space_simple_med,
		paddingVertical: spaces.item_space_simple,
		backgroundColor: colors.white_100,
		borderRadius: border_radius.border_simple,
		gap: spaces.item_space_min_big,
		overflow: "hidden",
	},
	container_image_info: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		gap: spaces.item_space_min_big,
	},
	container_image: {
		width: spaces.item_space_plus_med,
		height: spaces.item_space_plus_med,
		backgroundColor: colors.gray_8_100,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: border_radius.border_simple,
		overflow: "hidden",
	},
	image: {
		width: spaces.item_space_simple_med,
	},
	text_info_container: {
		flex: 1,
	},
	name_info: {
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.text_small,
		color: colors.black_2_100,
		lineHeight: fonts_sizes.text_small * 1.5,
		letterSpacing: letter_spacings.neg_min,
		flexShrink: 1,
		flexWrap: "wrap",
	},
	time_ago: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.small,
		color: colors.gray_2_100,
	},
	container_value: {
		alignItems: "flex-end",
		flexShrink: 0,
	},
	text_price: {
		textAlign: "right",
	},
	brl: {
		fontFamily: fonts.sofiapro_medium,
		fontSize: fonts_sizes.text_med,
		color: colors.black_2_100,
		letterSpacing: letter_spacings.min,
	},
	value: {
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.text_med,
		color: colors.black_2_100,
		letterSpacing: letter_spacings.min,
	},
	decimal: {
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.detail,
		color: colors.black_2_100,
		letterSpacing: letter_spacings.min,
	},
	transaction_status: {
		fontFamily: fonts.sofiapro_semiBold,
		fontSize: fonts_sizes.small,
		textAlign: "right",
	},
});
