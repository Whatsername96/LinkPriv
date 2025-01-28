import { Text } from "react-native";

import { TextAppProps } from "@/types/app";
import { styles } from "./styles";

export function LabelTitle({ text, textAlign = "center", ...rest }: TextAppProps) {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode={"tail"}
      style={[styles.title, { textAlign: textAlign }]}
      {...rest}
    >
      {text}
    </Text>
  );
}
