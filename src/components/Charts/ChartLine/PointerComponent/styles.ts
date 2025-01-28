import { StyleSheet } from "react-native";
import { colors, spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		width: spaces.item_space_simple,
		height: spaces.item_space_simple,
		backgroundColor: colors.white_100,
		borderWidth: spaces.item_space_tiny_med_big,
		borderColor: colors.pink_2_100,
		borderRadius: spaces.item_space_simple / 2,
		marginLeft: spaces.item_space_tiny_med_big,
		overflow: "hidden",
	},
});
