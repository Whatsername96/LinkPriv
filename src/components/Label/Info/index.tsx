import { Text } from "react-native";

import { TextAppProps } from "@/types/app";
import { styles } from "./styles";

export function LabelInfo({ text, textAlign = "left" }: TextAppProps) {
  return (
    <Text style={[styles.text, { textAlign: textAlign }]}>
      {text}
    </Text>
  );
}
