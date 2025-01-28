import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/constants/styles";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
	modal_container: {
		flex: 1,
	},
	modal_content: {
		backgroundColor: colors.black_3_60,
		flex: 1,
	},
});
