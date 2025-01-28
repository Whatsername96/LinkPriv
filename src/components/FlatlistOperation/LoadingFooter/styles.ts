import { StyleSheet } from "react-native";

import { spaces } from "@/constants/styles";

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spaces.item_space_med,
		gap: spaces.item_space_min,
		marginBottom: spaces.item_space_min,
	},
	date_container: {
		flexDirection: "row",
	},
	info_container: {
		flexDirection: "row",
		gap: spaces.item_space_min,
		alignItems: "center",
	},
	container_title_desc: {
		flex: 1,
		gap: spaces.item_space_small,
	},
	container_price: {
		gap: spaces.item_space_tiny,
	},
});
