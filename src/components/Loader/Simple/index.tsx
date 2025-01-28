import { ActivityIndicator, View } from "react-native";

import { colors, spaces } from "@/constants/styles";
import { styles } from "./styles";

export function LoaderSimple() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={spaces.item_space_simple_med} color={colors.pink_2_100} />
    </View>
  );
}
