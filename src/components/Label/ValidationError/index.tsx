import { Text } from "react-native";

import { styles } from "./styles";

type LabelValidationErrorProps = {
  message: string;
}

export function LabelValidationError({ message }: LabelValidationErrorProps) {
  return (
    <Text style={styles.text_error}>
      {message}
    </Text>
  );
}
