import { Text, TouchableOpacity } from "react-native";
import { CaretDown } from "phosphor-react-native";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type SelectProps = {
  text: string;
  handleClickInSelect: () => void;
}

export function Select({ text, handleClickInSelect }: SelectProps) {
  return (
    <TouchableOpacity
      style={styles.container_select}
      activeOpacity={0.5}
      onPress={handleClickInSelect}
    >
      <Text
        style={styles.text}
        numberOfLines={1}
        ellipsizeMode={"tail"}>
        {text}
      </Text>
      <CaretDown
        size={spaces.item_space_simple}
        color={colors.gray_12_100}
        weight={"regular"}
      />
    </TouchableOpacity>
  );
}
