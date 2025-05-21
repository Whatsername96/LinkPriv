import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/constants/styles";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.pink_1_100,
		position: "absolute",
		width: width,
		height: height,
		zIndex: 99,
	},
	circle: {
		position: "absolute",
	},
});
