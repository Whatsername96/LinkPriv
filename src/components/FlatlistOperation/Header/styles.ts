import { StyleSheet } from "react-native";
import { spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	content: {
		paddingTop: spaces.item_space_simple,
		paddingHorizontal: spaces.item_space_med,
		marginBottom: spaces.item_space_small,
	},
	extra_content: {
		marginBottom: spaces.item_space_med,
	},
});
