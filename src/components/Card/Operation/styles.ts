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
		alignItems: "flex-start",
		gap: spaces.item_space_min,
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
		fontFamily: fonts.poppins_medium,
		fontSize: fonts_sizes.text_small,
		color: colors.black_2_100,
		lineHeight: fonts_sizes.text_small * 1.5,
		letterSpacing: letter_spacings.neg_min,
		flexShrink: 1,
		flexWrap: "wrap",
	},
	product_info: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.small,
		color: colors.gray_4_100,
	},
	container_price_operation_status: {
		alignItems: "flex-end",
		flexShrink: 0,
	},
	price: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.text,
		lineHeight: fonts_sizes.text * 1.5,
		textAlign: "right",
	},
	transaction_status: {
		fontFamily: fonts.poppins_semiBold,
		fontSize: fonts_sizes.small,
		lineHeight: fonts_sizes.small * 1.5,
		textAlign: "right",
	},
});
