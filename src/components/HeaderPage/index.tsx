import { Text, TouchableOpacity } from "react-native";
import { CaretLeft } from "phosphor-react-native";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

type HeaderPageProps = {
  title: string;
  handleClickInBackButton: () => void;
}

export function HeaderPage({ title, handleClickInBackButton }: HeaderPageProps) {
  return (
    <TouchableOpacity
      style={styles.header}
      activeOpacity={0.7}
      onPress={handleClickInBackButton}
    >
      <CaretLeft
        size={spaces.item_space_med_min}
        color={colors.gray_12_100}
        weight={"bold"}
      />
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
