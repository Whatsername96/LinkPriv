import { StyleSheet } from "react-native";
import { colors, fonts, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		zIndex: 1,
		left: spaces.item_space_min - spaces.item_space_tiny,
	},
	placeholder: {
		fontFamily: fonts.plusJakartaSans_bold,
		flexShrink: 1,
		backgroundColor: colors.white_100,
		paddingHorizontal: spaces.item_space_tiny,
	},
});
