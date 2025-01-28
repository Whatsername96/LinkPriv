import { StyleSheet } from "react-native";
import {
	border_radius,
	colors,
	fonts,
	fonts_sizes,
	spaces,
} from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		borderRadius: border_radius.border_simple,
		overflow: "hidden",
	},
	content: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: spaces.item_space_min,
		backgroundColor: colors.white_100,
		borderRadius: border_radius.border_simple,
		overflow: "hidden",
		paddingHorizontal: spaces.item_space_simple,
		paddingVertical: spaces.item_space_min_big,
	},
	logo: {
		flexShrink: 0,
	},
	textContainer: {
		flex: 1,
		flexDirection: "column",
		gap: spaces.item_space_tiny_big,
	},
	title_date_container: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: spaces.item_space_min,
	},
	title: {
		fontFamily: fonts.helvetica_bold,
		fontSize: fonts_sizes.small,
		lineHeight: fonts_sizes.small * 1.5,
		color: colors.gray_15_100,
		flex: 1,
		marginRight: spaces.item_space_min,
	},
	date: {
		fontFamily: fonts.sofiapro_regular,
		fontSize: fonts_sizes.small,
		color: colors.gray_15_100,
		flexShrink: 1,
	},
	description: {
		fontFamily: fonts.helvetica_regular,
		fontSize: fonts_sizes.small,
		color: colors.gray_15_100,
		lineHeight: fonts_sizes.small * 1.5,
		flexShrink: 1,
	},
});
