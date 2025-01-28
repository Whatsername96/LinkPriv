import { Text } from "react-native";

import { styles } from "./styles";

type LabelComponentProps = {
  text: string;
}

export function LabelComponent({ text }: LabelComponentProps) {
  return (
    <Text
      style={styles.text}
    >
      {text}
    </Text>
  );
}
