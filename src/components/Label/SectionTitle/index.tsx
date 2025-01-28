import { Text } from "react-native";

import { styles } from "./styles";
import { TextAppProps } from "@/types/app";

export function LabelSectionTitle({ text, textAlign = "left" }: TextAppProps) {
  return (
    <Text style={[styles.title, { textAlign: textAlign }]}>
      {text}
    </Text>
  );
}
