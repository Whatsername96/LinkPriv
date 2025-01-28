import { Text } from "react-native";

import { TextAppProps } from "@/types/app";
import { styles } from "./styles";

export function LabelEmphasys({ text, textAlign = "center", ...rest }: TextAppProps) {
  return (
    <Text
      style={[styles.title, { textAlign: "justify" }]}
      {...rest}
    >
      {text}
    </Text>
  );
}
