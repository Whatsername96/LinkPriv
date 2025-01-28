import { Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type CardValueShadowProps = {
  value: number | string;
  isSelected: boolean;
  isDisabled?: boolean;
  handleClickInValue: () => void;
}

export function CardValueShadow({
  value,
  isSelected,
  isDisabled = false,
  handleClickInValue
}: CardValueShadowProps) {
  return (
    <Shadow
      startColor={colors.gray_9_100}
      endColor={colors.transparent}
      style={styles.container}
      distance={spaces.item_space_min}
      offset={[0, 3]}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleClickInValue}
        disabled={isDisabled}
        style={[
          styles.content,
          isSelected ?
            { backgroundColor: colors.blue_1_100 } :
            isDisabled ? { backgroundColor: colors.gray_6_100 } :
              { backgroundColor: colors.white_100 }
        ]}
      >
        <Text
          style={[
            styles.text,
            isSelected ? { color: colors.white_100 } : { color: colors.gray_4_100, }
          ]}
        >
          {
            typeof value === "number" ?
              "R$" + value.toLocaleString("pt-br", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })
              :
              value
          }
        </Text>
      </TouchableOpacity>
    </Shadow>
  );
}
