import { View, Text } from "react-native";

import { spaces } from "@/constants/styles";
import { styles } from "./styles";

type PointerLabelComponent = {
  value: number;
}

export function PointerLabelComponent({ value }: PointerLabelComponent) {
  return (

    <View
      style={[styles.container_label, {
        width: (value.toString().length + 5) * 10 + spaces.item_space_small * 2,
        transform: [{
          translateX: - ((value.toString().length + 2.5) * 5 + spaces.item_space_extra_min * 1)
        }]
      }]}>
      <View style={styles.baloon_detail} />
      <Text style={styles.label}>
        {value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Text>
    </View>
  );
}
