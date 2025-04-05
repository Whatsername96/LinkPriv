import { View, Text } from "react-native";

import { spaces } from "@/constants/styles";
import { styles } from "./styles";

type PointerLabelComponent = {
  value: number;
  isAllValuesZero: boolean;
}

export function PointerLabelComponent({ value, isAllValuesZero }: PointerLabelComponent) {
  const valueTruncated = value.toLocaleString("pt-br", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <View
      style={[styles.container_label, {
        width: (valueTruncated.length + 5) * 10 + spaces.item_space_small * 2,
        transform: [{
          translateX: - ((valueTruncated.length + 0.5) * 5 + spaces.item_space_extra_min * 1)
        },
        {
          translateY: isAllValuesZero ? -40 : 0
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
