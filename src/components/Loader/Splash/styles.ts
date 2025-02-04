import { colors } from "@/constants/styles";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.pink_1_100,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: width * 0.15,
		height: height * 0.15,
	},
});
