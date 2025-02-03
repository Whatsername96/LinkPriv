import { TextProps } from "react-native";

export type TextAppProps = TextProps & {
	text: string;
	textAlign?: "auto" | "center" | "left" | "right" | "justify";
};
