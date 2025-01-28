import { TextProps } from "react-native";

// Text
export type TextAppProps = TextProps & {
	text: string;
	textAlign?: "auto" | "center" | "left" | "right" | "justify";
};
