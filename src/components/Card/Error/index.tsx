import { Text, View } from "react-native";

import { styles } from "./styles";

type CardErrorProps = {
  message: string;
}

export function CardError({ message }: CardErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}
